import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Stage, Layer, Rect, Circle, RegularPolygon } from 'react-konva'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import threads from 'threads'

const styles = (theme) => ({
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
    marginBottom: '20vh',
  },
  slider: {
    width: '15vh',
    marginTop: '1vh'
  },
   textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: '15ch',
  },
})

const SCREEN_PERCENTAGE = 0.80

const CIRCLE = 0
const SQUARE = 1
const TRIANGLE = 2

function getSpiralIdx(n) {
  const k = Math.ceil((Math.sqrt(n) - 1) / 2)
  let t = 2 * k + 1
  let m = Math.pow(t, 2)
  t -= 1
  if (n >= m - t) {
    return {x: k-(m-n), y: -k}
  } else {
    m -= t
  }
  if (n >= m - t) {
    return {x: -k, y: -k + (m - n)}
  } else {
    m -= t
  }
  if (n >= m - t) {
    return {x: -k + (m-n), y: k}
  }
  return {x: k, y: k-(m-n-t)}
}

function spiralize(board, num) {
  const size = Math.pow(board.length, 2)
  const len = board.length
  const rawHalf = len / 2
  const half = len % 2 === 0 ?
              Math.ceil(rawHalf) - 1:
              Math.floor(rawHalf)
  for (let i = 0; i < size; i++) {
    const idx = getSpiralIdx(i)
    board[idx.x + half][idx.y + half] = num
    num += 1
  }
}

// Adapted from "Pi Delport" on stackoverflow
function primesSieve(limit, prevData) {
  let a = null
  let start = 0
  if (prevData) {
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

const TEXT_FIELDS = [
  {
    name: "Grid Size",
    id: "primeSize"
  },
  {
    name: "Shape Size",
    id: "shapeSize"
  },
  {
    name: "Starting Number",
    id: "start"
  },
]

function createTextFields(fields, values, cn, fn) {
  const doms = []
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]
    const value = values[i]
    doms.push((
    <TextField
          key={field.name}
          id={field.name}
          label={field.name}
          className={cn}
          value={value}
          onChange={fn(field.id)}
          margin="normal"
          variant="outlined"
        />
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
    const ps = primesSieve(Math.pow(primeSize + start, 2))
    this.prevPrimes = ps.data
    this.maxPrimeSize = primeSize
    this.spiral = null
    this.state = {
      bgColor: "white",
      color: "black",
      shape: CIRCLE,
      shapeSize: 5,
      start: start,
      stageSize: size,
      primeSize: primeSize,
      primes: ps.primes,
      notify: false,
      msg: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  notify(msg, then) {
    this.setState({
      msg: msg,
      notify: true
    }, then)
  }

  componentDidUpdate(prevProps, prevState) {
    const {primeSize, start} = this.state
    let newMaxPrimeSize = false
    if (primeSize > this.maxPrimeSize) {
      this.maxPrimeSize = primeSize
      newMaxPrimeSize = true
    }
    if (newMaxPrimeSize) {
      const limit = Math.pow(primeSize + start, 2)
      this.notify(`Calculating primes...`)
      this.updatePrimes(limit)
    }
    if (start && start !== prevState.start) {
      this.notify(`Calculating primes...`)
      const newLimit = Math.pow(primeSize + start, 2)
      const oldLimit = Math.pow(primeSize + prevState.start, 2)
      if (oldLimit < newLimit) {
        this.updatePrimes(newLimit)
      }
    }
  }

  updatePrimes(limit) {
    const primeThread = threads.spawn((input, done) => {
      const ps = function primesSieve(limit, prevData) {
        let a = null
        let start = 0
        if (prevData) {
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
    .send({limit: limit, prevPrimes: this.prevPrimes})
    .on('message', (response) => {
      this.prevPrimes = response.ps.data
      this.setState({
        primes: response.ps.primes
      })
      primeThread.kill()
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
    return shapes
  }

  handleChange(id){
    return (event) => {
      const res = parseInt(event.target.value)
      const val = res ? res : ""
      this.setState({[id]: val})
    }
  }

  render() {
    const {classes} = this.props
    const {stageSize, primeSize, shapeSize,
           start, notify, msg} = this.state
    const numberVars = [primeSize, shapeSize, start]
    this.spiral = this.makeSpiral() || this.spiral
    return (
      <div>
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
              {this.spiral}
            </Layer>
          </Stage>
        </div>
        {/* Controls */}
        <form className={classes.controls} noValidate autoComplete="off">
          {createTextFields(TEXT_FIELDS, numberVars,
                            classes.textField, this.handleChange)}
        </form>
      </div>
    )
  }
}

PrimeUlam.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PrimeUlam)
