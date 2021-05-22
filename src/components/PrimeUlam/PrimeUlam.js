import React, { Component } from 'react'
import { secondaryColor } from '../App/App'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Stage, Layer, Rect, Circle, RegularPolygon } from 'react-konva'
import { HuePicker } from 'react-color'
import Snackbar from '@material-ui/core/Snackbar'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import threads from 'threads'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
const TSlider = Slider.createSliderWithTooltip(Slider)

const SCREEN_PERCENTAGE = 0.80
const CALC_PRIMES = "Calculating Primes..."
const RENDER = "Rendering..."

const CIRCLE = 0
const SQUARE = 1
const TRIANGLE = 2

function getSpiralIdx(n) {
  const k = Math.ceil((Math.sqrt(n) - 1) / 2)
  let t = 2 * k + 1
  let m = Math.pow(t, 2)
  t -= 1
  if (n >= m - t) {
    return {x: k-(m-n), y: k}
  } else {
    m -= t
  }
  if (n >= m - t) {
    return {x: -k, y: k - (m - n)}
  } else {
    m -= t
  }
  if (n >= m - t) {
    return {x: -k + (m-n), y: -k}
  }
  return {x: k, y: -k+(m-n-t)}
}

function spiralize(board, num) {
  const size = Math.pow(board.length, 2)
  const len = board.length
  const rawHalf = len / 2
  const half = len % 2 === 0 ?
              Math.ceil(rawHalf) - 1:
              Math.floor(rawHalf)
  for (let i = 1; i <= size; i++) {
    const idx = getSpiralIdx(i)
    board[idx.x + half][idx.y + half] = num
    num += 1
  }
}

const SLIDER_FIELDS = [
  {
    name: "Grid\xa0Size\xa0(NxN)",
    id: "primeSize",
    min: 5,
    max: 1001,
  },
  {
    name: "Shape\xa0Size",
    id: "shapeSize",
    min: 1,
    max: 100,
  },
  {
    name: "Starting\xa0Number",
    id: "start",
    min: 1,
    max: 500,
  },
]

function createSliders(fields, values, classes, fn) {
  const doms = []
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]
    const value = values[i]
    doms.push((
      <div
        className={classes.sliderField}
        key={field.name}
        id={field.name}>
          <Typography align="left" className={classes.slideLabel} color="textSecondary">{`${field.name}:\xa0${value}`}</Typography>
          <TSlider
            handleStyle={{backgroundColor: secondaryColor, borderColor: secondaryColor}}
            trackStyle={{backgroundColor: secondaryColor, borderColor: secondaryColor}}
            className={classes.slider}
            min={field.min}
            max={field.max}
            step={1}
            defaultValue={value}
            onAfterChange={fn(field.id)}/>
      </div>
    ))
  }
  return doms
}

class PrimeUlam extends Component {

  constructor(props) {
    super(props)
    const start = 1
    const primeSize = 101
    this.board = null
    this.prevPrimes = null
    this.backgroundRect = null
    this.maxPrimeSize = primeSize
    this.maxStart = start
    this.state = {
      spiral: null,
      bgColor: "white",
      color: "black",
      shape: CIRCLE,
      shapeSize: 5,
      start: start,
      stageSize: 0,
      primeSize: primeSize,
      primes: null,
      notify: false,
      msg: '',
    }
    this.layer = null
    this.handleSlider = this.handleSlider.bind(this)
    this.makeSpiral = this.makeSpiral.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  notify(msg, then) {
    this.setState({
      msg: msg,
      notify: true
    }, then)
  }

  updateDimensions() {
    this.setState({
      stageSize: Math.trunc(Math.min(window.innerWidth, window.innerHeight) * SCREEN_PERCENTAGE)
    }, this.makeSpiral)
  }

  componentDidMount() {
    const {primeSize, start} = this.state
    this.updatePrimes(Math.pow(primeSize + start, 2))
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions)
  }

  componentDidUpdate(prevProps, prevState) {
    const {primeSize, start, shapeSize} = this.state
    if (primeSize !== prevState.primeSize) {
      if (this.maxPrimeSize < primeSize) {
        this.maxPrimeSize = primeSize
        const limit = Math.pow(primeSize + start, 2)
        this.updatePrimes(limit)
      } else {
        this.notify(RENDER, this.makeSpiral)
      }
    }
    if (start && start !== prevState.start) {
      const newLimit = Math.pow(this.maxPrimeSize + start, 2)
      const oldLimit = Math.pow(this.maxPrimeSize + this.maxStart, 2)
      if (oldLimit < newLimit) {
        this.maxStart = start
        this.updatePrimes(newLimit)
      } else {
        this.notify(RENDER, (ns)=> {
          this.makeSpiral(false, true)
        })
      }
    }
    if (shapeSize !== prevState.shapeSize) {
      this.notify(RENDER, this.makeSpiral)
    }
  }

  updatePrimes(limit) {
    const primeThread = threads.spawn((input, done) => {
      const ps = function primesSieve(limit, prevData) {
        let a = null
        let start = 0
        if (prevData && prevData.length < limit) {
          a = prevData
          const prevLen = prevData.length
          start = prevLen
          // Limit MUST be greater then prev data len
          const diff = limit - prevLen
          for (let i = 0; i < diff; i++) {
            a.push(true)
          }
        } else {
          a = Array(limit)
          a[0] = false
          a[1] = false
          a.fill(true, 2, limit)
        }
        const ans = new Set([])
        for(let i = start; i < a.length; i++) {
          const isPrime = a[i]
          if (isPrime) {
            ans.add(i)
            for (let n = i*i; n < limit; n+=i) {
              a[n] = false
            }
          }
        }
        return {primes: ans, prevData: a}
      }
      done({ps: ps(input.limit, input.prevPrimes)})
    })
    this.notify(CALC_PRIMES)
    primeThread.send({limit: limit, prevPrimes: this.prevPrimes})
    .on('message', (response) => {
      this.prevPrimes = response.ps.data
      this.setState({
        primes: response.ps.primes
      }, (ns)=>{ this.makeSpiral(true) })
    })
  }

  makeSpiral(newBoard, newStart=false) {
    const {start, primeSize, stageSize, shapeSize,
           color, primes} = this.state
    if (!stageSize || !primeSize || !start ||
        !shapeSize || !primes) {
      return null
    }
    const primeJump = Math.ceil(stageSize / primeSize)
    if (newBoard) {
      this.board = []
      for (let i = 0; i < primeSize; i++) {
        const tempArr = Array(primeSize)
        this.board.push(tempArr)
      }
    }
    if (newBoard || newStart) {
      spiralize(this.board, start)
    }
    const circles = []
    const squares = []
    const triangs = []
    for (let x = 0; x < primeSize; x++) {
      for (let y = 0; y < primeSize; y++) {
        if (primes.has(this.board[x][y])) {
          const jx = x * primeJump
          const jy = y * primeJump
          const key = `${x} ${y}`
          circles.push(<Circle
                        key={key}
                        x={jx} y={jy}
                        radius={shapeSize}
                        fill={color}
                        listening={false}
                        perfectDrawEnabled={false}/>)
          squares.push(<Rect
                        key={key}
                        x={jx} y={jy}
                        width={shapeSize} height={shapeSize}
                        fill={color}
                        listening={false}
                        perfectDrawEnabled={false}/>)
          triangs.push(<RegularPolygon
                        key={key}
                        x={jx} y={jy}
                        sides={3} radius={shapeSize}
                        fill={color}
                        listening={false}
                        perfectDrawEnabled={false}/>)
        }
      }
    }
    this.setState({
        spiral: {
          [CIRCLE]: circles,
          [SQUARE]: squares,
          [TRIANGLE]: triangs,
        }
      }
    )
  }

  handleSlider(id){
    return (val) => {
      this.setState({[id]: val})
    }
  }

  render() {
    const {classes} = this.props
    const {stageSize, primeSize, shapeSize,
           start, notify, msg, spiral,
           color, bgColor, shape} = this.state
    const numberVars = [primeSize, shapeSize, start]
    const shapes = spiral ? spiral[shape] : []
    if (this.layer) this.layer.batchDraw()
    return (
      <div className={classes.title}>
        <Typography align="center" variant="h5"> Ulam Spiral Generator</Typography>
        <Snackbar
          anchorOrigin={{vertical: "bottom", horizontal: "left"}}
          open={notify}
          autoHideDuration={2000}
          onClose={()=> {this.setState({notify: false})}}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{msg}</span>}/>
        <div className={classes.root}>
          <Stage className={classes.stage}
                 width={stageSize}
                 height={stageSize}>
            <Layer>
              <Rect x={0} y={0}
                    width={stageSize} height={stageSize}
                    fill={bgColor} shadowBlur={5}/>
            </Layer>
            <Layer ref={(ref)=> this.layer = ref}>
              <Rect x={0} y={0}
                    width={stageSize} height={stageSize}
                    fill={bgColor} shadowBlur={5}/>
              {shapes}
            </Layer>
          </Stage>
        </div>
        {/* Controls */}
        <div className={classes.cardHolder}>
        <Card className={classes.card} elevation={4}>
          <CardContent>
            <Typography className={classes.controlsLabel} variant="h6">Controls</Typography>
            <form className={classes.controls} noValidate autoComplete="off">
              {createSliders(SLIDER_FIELDS, numberVars, classes, this.handleSlider)}
              <div className={classes.cPickers}>
                <span className={classes.colorPicker}>
                  <Typography align="left" color="textSecondary">Background Color</Typography>
                  <HuePicker
                    color={bgColor}
                    onChangeComplete={(c) => {
                      if (!c) return
                      this.setState({bgColor: c.hex})}
                  }/>
                </span>
                <span className={classes.colorPicker}>
                 <Typography align="left" color="textSecondary">Shape Color</Typography>
                 <HuePicker
                    color={color}
                    onChangeComplete={(c) => {
                      if(!c) return
                      this.setState({color: c.hex}, this.makeSpiral)
                  }}/>
                </span>
              </div>
              <div>
                <FormControl className={classes.shapePicker}>
                  <InputLabel htmlFor="select">Shape</InputLabel>
                  <Select
                    value={this.state.shape}
                    onChange={(event)=> {
                        this.setState({[event.target.name]: event.target.value})
                      }}
                    inputProps={{
                      name: 'shape',
                      id: 'select',
                    }}>
                    <MenuItem value={0}>Circle</MenuItem>
                    <MenuItem value={1}>Square</MenuItem>
                    <MenuItem value={2}>Triangle</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </form>
          </CardContent>
        </Card>
        </div>
        {/* Bottom Text */}
        <div className={classes.endingText}>
          <Typography component="p" >
            <b>Warning</b>: higher grid sizes may cause some slow down.<br/>
            This project was inspired by{" "}
            <a href="https://www.youtube.com/watch?v=iFuR97YcSLM">this</a>
            {" "} awesome numberphile video.
            You can read more about Prime Ulam Spirals{" "}
            <a href="https://en.wikipedia.org/wiki/Ulam_spiral">here.</a><br/>
            You can also check out the{" "}
            <a href="https://gitlab.com/danielloera/primeulam">python version</a>
            {" "}I made.
          </Typography>
        </div>
      </div>
    )
  }
}

const styles = (theme) => ({
  title: {
    marginTop: '3vh',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  stage: {
    marginTop: '3vh',
  },
  card: {
    marginTop: '2rem',
    padding: '1rem',
    minWidth: '30vw',
    maxWidth: '90vw',
  },
  cardHolder: {
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  controlsLabel: {
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: theme.spacing(3),
  },
  sliderField: {
    width: '15ch',
    margin: theme.spacing(4),
  },
  colorPicker: {
    margin: theme.spacing(4),
    padding: theme.spacing(4),
    maxWidth: '15rem',
  },
  cPickers: {
    display: 'block',
    marginTop: theme.spacing(3),
  },
  slideLabel: {
    marginBottom: theme.spacing(3)
  },
  shapePicker: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4)
  },
  endingText: {
    marginTop: theme.spacing(3),
    marginBottom: '25vh',
    padding: theme.spacing(2)
  }
})

PrimeUlam.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PrimeUlam)
