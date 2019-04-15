import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Stage, Layer, Rect, Circle, RegularPolygon, Text } from 'react-konva'
import TextField from '@material-ui/core/TextField'

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
    marginBottom: '10vh',
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

const UP = 0
const LEFT = 1
const DOWN = 2
const RIGHT = 3

const CIRCLE = 0
const SQUARE = 1
const TRIANLGE = 2

const NEXT_MOVEMENT = {
            [UP]: LEFT,
            [LEFT]: DOWN,
            [DOWN]: RIGHT,
            [RIGHT]: UP
}

function neighbor(currMovement, x, y, board) {
  if (currMovement === UP){
    return board[x][y - 1]
  }
  if (currMovement === LEFT){
    return board[x + 1][y]
  }
  if (currMovement === DOWN){
    return board[x][y + 1]
  }
  return board[x - 1][y]
}

function move(currMovement, x, y) {
  if (currMovement === UP){
    return { x: x - 1, y: y }
  }
  if (currMovement === LEFT){
    return { x: x, y: y - 1 }
  }
  if (currMovement === DOWN){
    return { x: x + 1, y: y }
  }
  return { x: x, y: y + 1 }
}

function spiralize(board, num) {
  const size = board.length
  let x = Math.trunc(size / 2)
  let y = x
  board[x][y] = num
  let movement = RIGHT
  let newMove = move(movement, x, y)
  x = newMove.x
  y = newMove.y
  num += 1
  while (x >= 0 && x < size && y >= 0 && y < size) {
    if (neighbor(movement, x, y, board) !== null) {
      board[x][y] = num
      newMove = move(movement, x, y)
      x = newMove.x
      y = newMove.y
      num += 1
    } else {
      movement = NEXT_MOVEMENT[movement]
    }
  }
}

// Adapted from "Pi Delport" on stackoverflow
function primesSieve(limit) {
  const a = Array(limit)
  a[0] = false
  a[1] = false
  a.fill(true, 2, limit)
  const ans = new Set([])
  for(let i = 0; i < a.length; i++) {
    const isPrime = a[i]
    if (isPrime) {
      ans.add(i)
      for (let n = i*i; n < limit; n+=i) {
        a[n] = false
      }
    }
  }
  return ans
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
    const primes = primesSieve(Math.pow(primeSize + start, 2))
    this.state = {
      bgColor: "white",
      color: "black",
      shape: CIRCLE,
      shapeSize: 5,
      start: start,
      stageSize: size,
      primeSize: primeSize,
      primes: primes,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const {primeSize, start} = this.state
    if (primeSize !== prevState.primeSize) {
      if (prevState.primeSize < primeSize) {
        this.setState({
          primes: primesSieve(Math.pow(primeSize + start, 2))
        })
      }
    }
    if (start !== prevState.start) {
      const newTotal = Math.pow(primeSize + start, 2)
      const oldTotal = Math.pow(primeSize + prevState.start, 2)
      if (oldTotal < newTotal) {
        this.setState({
          primes: primesSieve(newTotal)
        })
      }
    }
  }

  makeSpiral() {
    const {start, primeSize, stageSize, shapeSize,
           shape, color, primes} = this.state
    if (!stageSize || !primeSize) return [<Text text="" />]
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
            case shape === TRIANLGE:
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
    const {stageSize, primeSize, shapeSize, start} = this.state
    const numberVars = [primeSize, shapeSize, start]
    return (
      <div>
        <div className={classes.root}>
          <Stage className={classes.stage}
                 width={stageSize}
                 height={stageSize}>
            <Layer>
              {/* Background */}
              <Rect x={0} y={0} width={stageSize} height={stageSize}
                    fill={this.state.bgColor} shadowBlur={5}/>
              {/* Spiral Shapes */}
              {this.makeSpiral()}
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
