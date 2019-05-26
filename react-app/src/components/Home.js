import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import kiwi from '../images/kiwi.png'
import trex from '../images/komodo.png'
import komodo from '../images/trex.png'
import Snackbar from '@material-ui/core/Snackbar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import RWIcon from '@material-ui/icons/FastRewind'
import FFIcon from '@material-ui/icons/FastForward'
import CodeIcon from '@material-ui/icons/Code'
import ResumeIcon from '@material-ui/icons/Description'
import ContactIcon from '@material-ui/icons/Email'
import Typography from '@material-ui/core/Typography'
import { createLinks } from '../utils'
import './Home.css'

const styles = (theme) => ({
  root: {
    textAlign: "center",
    minHeight: "100vh",
    fontSize: "calc(12px + 2vmin)",
    marginTop: theme.spacing.unit*14
  },
  spinningImage: {
    animation: "App-logo-spin infinite 3s linear",
    marginBottom: theme.spacing.unit*12,
    height: "25vh",
    maxWidth: "90vw",
    objectFit: "cover",
  },
  card: {
    padding: ".5rem"
  },
  cardHolder: {
    justifyContent: "center",
    display: "flex"
  }
})

const LINKS = [
  {
    name: "Gitlab",
    link: "https://gitlab.com/danielloera",
    icon: (<CodeIcon fontSize="large"/>)
  },
  {
    name: "Resume",
    link: "https://docs.google.com/document/d/18sWdFkdfeEGWD7KpvNJ7I25CUm_n0n1hrINJsOv3VzA",
    icon: (<ResumeIcon fontSize="large"/>)
  },
  {
    name: "Contact",
    link: "mailto:daniel@reatret.net",
    icon: (<ContactIcon fontSize="large"/>)
  },
]

const imgs = [kiwi, trex, komodo]

const FASTER = 0
const SLOWER = 1

function spinImgAt(secs) {
  return {
    animation: `App-logo-spin infinite ${secs}s linear`,
    cursor: "pointer"
  }
}

function createSnackBar(v, h, message, open, handleClose) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: v,
        horizontal: h,
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}/>
  )
}

function createControl(name, fn) {
  return [
      <IconButton key={`${name}1`}
        aria-label={`${name} Slower`}
        onClick={fn(SLOWER)}>
        <RWIcon/>
      </IconButton>,
      <Typography key={`${name}2`}>{name}</Typography>,
      <IconButton key={`${name}3`}
        aria-label={`${name} Faster`}
        onClick={fn(FASTER)}>
        <FFIcon/>
      </IconButton>
  ]
}

class Home extends Component {

  constructor(props) {
    super(props)
    this.defaultSpin = 3
    this.defaultSwap = 3000
    this.state = {
                  imgIdx: Math.trunc(Math.random() * imgs.length),
                  spinSpeed: this.defaultSpin,
                  swapSpeed: this.defaultSwap,
                  swapSnack: false,
                  spinSnack: false,
                  swapMsg: '',
                  spinMsg: ''
                 }
    this.imgTick = this.imgTick.bind(this)
    this.spin = this.spin.bind(this)
    this.swap = this.swap.bind(this)
    this.reset = this.reset.bind(this)
    this.swapTimer = setInterval(this.imgTick, this.state.swapSpeed)
  }

  componentWillUnmount() {
    clearInterval(this.swapTimer)
  }

  imgTick() {
    if (this.state == null) return
    let newIdx = this.state.imgIdx + 1
    if (newIdx === imgs.length) {
      newIdx = 0
    }
    this.setState({imgIdx: newIdx})
  }


  reset() {
    clearInterval(this.swapTimer)
    this.setState({
      spinSpeed: this.defaultSpin,
      swapSpeed: this.defaultSwap,
      spinMsg: `Spinning and swapping every ${this.defaultSpin}s`,
      spinSnack: true
    },
    (newState)=> {
      this.swapTimer = setInterval(this.imgTick, this.defaultSwap)
    })
  }

  spin(type) {
    return () => {
      const {spinSpeed} = this.state
      let newSpeed = null
      if (type === FASTER) {
        newSpeed = spinSpeed / 2
      } else {
        newSpeed = spinSpeed * 2
      }
      this.setState({
        spinSpeed: newSpeed,
        spinMsg: `Spinning every ${newSpeed}s`,
        spinSnack: true
      })
    }
  }

  swap(type) {
    return () => {
      const {swapSpeed} = this.state
      let newSpeed = null
      if (type === FASTER) {
        newSpeed = swapSpeed / 2
      } else {
        newSpeed = swapSpeed * 2
      }
      clearInterval(this.swapTimer)
      this.setState(
        {
          swapSpeed: newSpeed,
          swapMsg: `Swapping every ${newSpeed / 1000}s`,
          swapSnack: true
        },
        (newState)=> {this.swapTimer = setInterval(this.imgTick, newSpeed)})
    }
  }

  render() {
    const {classes} = this.props
    const {imgIdx, spinSpeed, swapMsg,
           spinMsg, spinSnack, swapSnack} = this.state
    const logo = imgs[imgIdx]
    const spinStyle = spinImgAt(spinSpeed)
    return (
      <div className={classes.root}>
        {/* Snackbars */}
        {createSnackBar('bottom', 'left', spinMsg, spinSnack,
                        () => {this.setState({spinSnack: false})})}
        {createSnackBar('bottom', 'right', swapMsg, swapSnack,
                        () => {this.setState({swapSnack: false})})}
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item xs={12}>
          {/* Spinning Image */}
          <img src={logo} className={classes.spinningImage} alt="logo" style={spinStyle}/>
          </Grid>
          <Grid item xs={12} className={classes.cardHolder}>
            {/* Control Card */}
            <Card className={classes.card} elevation={5}>
              <CardContent>
                <Typography component="p">
                  Hi, I'm Daniel. I love making things.
                  <br/>
                  You can see some of them on this site or linked below.
                  <br/>
                  Have fun <i>spinning</i>.
                </Typography>
              </CardContent>
              <CardActions style={{justifyContent: 'center'}}>
                 {createControl("Spin", this.spin)}
                 <Button size="small" variant="contained" color="secondary" onClick={this.reset}>Reset</Button>
                 {createControl("Swap", this.swap)}
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12}>
            {/* Links */}
            {createLinks(LINKS)}
          </Grid>
        </Grid>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
