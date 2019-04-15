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
    marginTop: '2vh',
  },
  slider: {
    width: '15vh',
    marginTop: '1vh'
  },
   textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
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
    name: "Number of Primes",
    id: "primeSize"
  }
]

function createTextFields(fields, value, cn, fn) {
  return fields.map((field) => (
    <TextField
          key={field.name}
          id={field.name}
          label={field.name}
          className={cn}
          value={value}
          onChange={fn(field.id)}
          margin="normal"
        />
  ))
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
    const {primeSize, size, start} = this.state
    if (primeSize !== prevState.primeSize) {
      const newPrimes = primesSieve(Math.pow(primeSize + start, 2))
      this.setState({
        primes: newPrimes
      })
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
          switch (true) {
            case shape === TRIANLGE:
              currShape = (<RegularPolygon
                              x={jx} y={jy}
                              sides={3} radius={shapeSize}
                              fill={color}/>)
              break
            case shape === SQUARE:
              currShape = (<Rect
                              x={jx} y={jy}
                              width={shapeSize} height={shapeSize}
                              fill={color}/>)
              break
            default:
              currShape = (<Circle
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
      if (res) {
        this.setState({[id]: res})
      }
    }
  }

  render() {
    const {classes} = this.props
    const {stageSize, primeSize} = this.state
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
          {createTextFields(TEXT_FIELDS, primeSize,
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
