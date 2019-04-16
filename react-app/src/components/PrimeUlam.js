import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Stage, Layer, Rect, Circle, RegularPolygon } from 'react-konva'
import Snackbar from '@material-ui/core/Snackbar'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import threads from 'threads'
import Slider from 'rc-slider'
import ColorPicker from 'material-ui-color-picker'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
const TSlider = Slider.createSliderWithTooltip(Slider)

const SCREEN_PERCENTAGE = 0.80
const CALC_PRIMES = "Calculating Primes..."

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
    name: "Grid Size (NxN)",
    id: "primeSize",
    min: 5,
    max: 1001,
  },
  {
    name: "Shape Size",
    id: "shapeSize",
    min: 1,
    max: 100,
  },
  {
    name: "Starting Number",
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
          <Typography align="left" className={classes.slideLabel} color="textSecondary">{`${field.name}:\t${value}`}</Typography>
          <TSlider
            handleStyle={{backgroundColor: 'pink', borderColor: 'pink'}}
            trackStyle={{backgroundColor: 'pink', borderColor: 'pink'}}
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
    const size = Math.trunc(Math.min(window.innerWidth, window.innerHeight) * SCREEN_PERCENTAGE)
    const start = 1
    const primeSize = 101
    this.prevPrimes = null
    this.maxPrimeSize = primeSize
    this.maxStart = start
    this.state = {
      spiral: null,
      bgColor: "white",
      color: "black",
      shape: CIRCLE,
      shapeSize: 5,
      start: start,
      stageSize: size,
      primeSize: primeSize,
      primes: null,
      notify: false,
      msg: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.makeSpiral = this.makeSpiral.bind(this)
  }

  notify(msg, then) {
    this.setState({
      msg: msg,
      notify: true
    }, then)
  }

  componentDidMount() {
    const {primeSize, start} = this.state
    this.notify(CALC_PRIMES)
    this.updatePrimes(Math.pow(primeSize + start, 2),
                      this.makeSpiral)
  }

  componentDidUpdate(prevProps, prevState) {
    const {primeSize, start, shapeSize} = this.state
    if (primeSize !== prevState.primeSize) {
      if (this.maxPrimeSize < primeSize) {
        this.notify(CALC_PRIMES)
        this.maxPrimeSize = primeSize
        const limit = Math.pow(primeSize + start, 2)
        this.updatePrimes(limit, this.makeSpiral)
      } else {
        this.makeSpiral()
      }
    }
    if (start && start !== prevState.start) {
      const newLimit = Math.pow(this.maxPrimeSize + start, 2)
      const oldLimit = Math.pow(this.maxPrimeSize + this.maxStart, 2)
      if (oldLimit < newLimit) {
        this.notify(CALC_PRIMES)
        this.maxStart = start
        this.updatePrimes(newLimit, this.makeSpiral)
      } else {
        this.makeSpiral()
      }
    }
    if (shapeSize !== prevState.shapeSize) {
      this.makeSpiral()
    }
  }

  updatePrimes(limit, then) {
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
    primeThread.send({limit: limit, prevPrimes: this.prevPrimes})
    .on('message', (response) => {
      this.prevPrimes = response.ps.data
      this.setState({
        primes: response.ps.primes
      }, then)
    })
  }

  makeSpiral() {
    const {start, primeSize, stageSize, shapeSize,
           shape, color, primes} = this.state
    if (!stageSize || !primeSize || !start ||
        !shapeSize) {
      return null
    }
    const board = []
    const primeJump = Math.ceil(stageSize / primeSize)
    for (let i = 0; i < primeSize; i++) {
      const tempArr = Array(primeSize)
      tempArr.fill(null, 0, primeSize)
      board.push(tempArr)
    }
    spiralize(board, start)
    const shapes = []
    for (let x = 0; x < primeSize; x++) {
      for (let y = 0; y < primeSize; y++) {
        if (primes.has(board[x][y])) {
          let currShape = null
          const jx = x * primeJump
          const jy = y * primeJump
          const key = `${x} ${y}`
          switch (true) {
            case shape === TRIANGLE:
              currShape = (<RegularPolygon
                              key={key}
                              x={jx} y={jy}
                              sides={3} radius={shapeSize}
                              fill={color}/>)
              break
            case shape === SQUARE:
              currShape = (<Rect
                              key={key}
                              x={jx} y={jy}
                              width={shapeSize} height={shapeSize}
                              fill={color}/>)
              break
            default:
              currShape = (<Circle
                              key={key}
                              x={jx} y={jy}
                              width={shapeSize} height={shapeSize}
                              fill={color}/>)
          }
          shapes.push(currShape)
        }
      }
    }
    this.setState({spiral: shapes})
  }

  handleChange(id){
    return (val) => {
      this.setState({[id]: val})
    }
  }

  render() {
    const {classes} = this.props
    const {stageSize, primeSize, shapeSize,
           start, notify, msg, spiral,
           color, bgColor} = this.state
    const numberVars = [primeSize, shapeSize, start]
    return (
      <div className={classes.title}>
        <Typography align="center" variant="h4"> Ulam Spiral Generator</Typography>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
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
              {/* Background */}
              <Rect x={0} y={0} width={stageSize} height={stageSize}
                    fill={this.state.bgColor} shadowBlur={5}/>
              {/* Spiral Shapes */}
              {spiral}
            </Layer>
          </Stage>
        </div>
        {/* Controls */}
        <form className={classes.controls} noValidate autoComplete="off">
          {createSliders(SLIDER_FIELDS, numberVars, classes, this.handleChange)}
          <div className={classes.cPickers}>
            <span className={classes.colorPicker}>
              <Typography align="left" color="textSecondary">Background Color</Typography>
              <ColorPicker
                className={classes.colorPicker}
                name='bgColor'
                defaultValue={bgColor}
                onChange={(c) => {
                  if (!c) return
                  this.setState({bgColor: c})}
              }/>
            </span>
            <span className={classes.colorPicker}>
             <Typography align="left" color="textSecondary">Shape Color</Typography>
             <ColorPicker
                name='color'
                defaultValue={color}
                onChange={(c) => {
                    if(!c) return
                    this.setState({color: c}, this.makeSpiral)
              }}/>
            </span>
        </div>
        <FormControl className={classes.shapePicker}>
          <InputLabel htmlFor="select">Shape</InputLabel>
          <Select
            value={this.state.shape}
            onChange={(event)=> {
                this.setState({[event.target.name]: event.target.value},
                  this.makeSpiral)
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
        </form>
        <div className={classes.endingText}>
          <Typography style={{fontSize: "2vmin"}}>
            This project was inspired by{" "}
            <a href="https://www.youtube.com/watch?v=iFuR97YcSLM">this</a>
            {" "} awesome numberphile video. <br/>
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
    marginTop: '4vh',
    textAlign: 'center',
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
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '2vh',
    marginLeft: theme.spacing.unit*3,
    marginRight: theme.spacing.unit*3,
  },
  sliderField: {
    width: '15ch',
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit*3,
    marginRight: theme.spacing.unit,
  },
  colorPicker: {
    marginLeft: theme.spacing.unit*2,
    marginRight: theme.spacing.unit*2,
    maxWidth: '15ch',
  },
  cPickers: {
    display: 'flex',
    marginTop: theme.spacing.unit,
  },
  slideLabel: {
    marginBottom: theme.spacing.unit*3
  },
  shapePicker: {
    marginTop: theme.spacing.unit
  },
  endingText: {
    marginTop: '7vh',
    marginBottom: '25vh',
  }
})

PrimeUlam.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PrimeUlam)
