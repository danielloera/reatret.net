import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import kiwi from '../../images/kiwi.png'
import trex from '../../images/komodo.png'
import komodo from '../../images/trex.png'
import Snackbar from '@material-ui/core/Snackbar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import RWIcon from '@material-ui/icons/FastRewind'
import FFIcon from '@material-ui/icons/FastForward'
import GitHubIcon from '@material-ui/icons/GitHub'
import ResumeIcon from '@material-ui/icons/Description'
import ContactIcon from '@material-ui/icons/Email'
import Typography from '@material-ui/core/Typography'
import { createLinks } from '../../utils'
import './Home.css'

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(16),
    textAlign: "center"
  },
  spinningImage: {
    animation: "logo-spin infinite 3s linear",
    height: "25vh",
    maxWidth: "90vw",
    display: "flex",
    marginBottom: theme.spacing(12),
  },
  card: {
    padding: theme.spacing(1),
  },
  centerHolder: {
    justifyContent: "center",
    display: "flex"
  },
})

const LINKS = [
  {
    name: "GitHub",
    link: "https://github.com/danielloera",
    icon: (<GitHubIcon fontSize="large"/>)
  },
  {
    name: "Resume",
    link: "https://docs.google.com/document/d/18sWdFkdfeEGWD7KpvNJ7I25CUm_n0n1hrINJsOv3VzA",
    icon: (<ResumeIcon fontSize="large"/>)
  },
  {
    name: "Contact",
    link: "mailto:danny.reatret@gmail.com",
    icon: (<ContactIcon fontSize="large"/>)
  },
]

const imgs = [kiwi, trex, komodo]

const FASTER = 0
const SLOWER = 1
const Links = createLinks(LINKS)

function spinImgAt(secs) {
  return {
    animation: `logo-spin infinite ${secs}s linear`
  }
}

function createSnackBar(v, h, message, open, handleClose) {
  return (
    <Snackbar key={h}
      anchorOrigin={{vertical: v, horizontal: h}}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      ContentProps={{'aria-describedby': 'message-id'}}
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

const defaultSpin = 3
const defaultSwap = 3000

function Home(props) {
  const { classes } = props
  const [imgIdx, setImgIdx] = useState(Math.trunc(Math.random() * imgs.length))
  const [spinSpeed, setSpinSpeed] = useState(defaultSpin)
  const [swapSpeed, setSwapSpeed] = useState(defaultSwap)
  const [spinSnack, setSpinSnack] = useState(false)
  const [swapSnack, setSwapSnack] = useState(false)
  const [spinMsg, setSpinMsg] = useState('')
  const [swapMsg, setSwapMsg] = useState('')

  function reset() {
    setSpinSpeed(defaultSpin)
    setSwapSpeed(defaultSwap)
    setSpinMsg(`Spinning and swapping every ${defaultSpin}s`)
    setSpinSnack(true)
  }

  const spin = useCallback((type) => {
    return () => {
      let newSpeed = null
      if (type === FASTER) {
        newSpeed = spinSpeed / 2
      } else {
        newSpeed = spinSpeed * 2
      }
      setSpinSpeed(newSpeed)
      setSpinMsg(`Spinning every ${newSpeed}s`)
      setSpinSnack(true)
    }
  }, [spinSpeed])

  const swap = useCallback((type) => {
    return () => {
      let newSpeed = null
      if (type === FASTER) {
        newSpeed = swapSpeed / 2
      } else {
        newSpeed = swapSpeed * 2
      }
      setSwapSpeed(newSpeed)
      setSwapMsg(`Swapping every ${newSpeed / 1000}s`)
      setSwapSnack(true)
    }
  }, [swapSpeed])

  // Update swap interval on imageChange/speedChange
  useEffect(() => {
    function imgTick() {
      let newIdx = imgIdx + 1
      if (newIdx === imgs.length) {
        newIdx = 0
      }
      setImgIdx(newIdx)
    }
    const id = setInterval(imgTick, swapSpeed)
    return () => clearInterval(id)
  }, [swapSpeed, imgIdx])

  const logo = imgs[imgIdx]
  const spinStyle = useMemo(() => spinImgAt(spinSpeed), [spinSpeed])
  const spinSnackBar = useMemo(() => (
    createSnackBar('bottom', 'left', spinMsg, spinSnack,
                   (e, r) => {if(r === 'timeout') setSpinSnack(false)})),
    [spinMsg, spinSnack])
  const swapSnackBar = useMemo(() => (
    createSnackBar('bottom', 'right', swapMsg, swapSnack,
                   (e, r) => {if(r === 'timeout') setSwapSnack(false)})),
    [swapMsg, swapSnack])
  const spinControl = useMemo(() => createControl("Spin", spin), [spin])
  const swapControl = useMemo(() => createControl("Swap", swap), [swap])
  return (
    <Container className={classes.root}>
      {/* Snackbars */}
      {[spinSnackBar, swapSnackBar]}
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={12} className={classes.centerHolder}>
        {/* Spinning Image */}
        <img src={logo} className={classes.spinningImage} alt="logo" style={spinStyle}/>
        </Grid>
        <Grid item xs={12} sm={10} md={6} className={classes.cardHolder}>
          {/* Control Card */}
          <Card className={classes.card} elevation={5}>
            <CardContent>
              <Typography component="p" variant="body1">
                Hi, I'm Daniel. I love making things.
                <br/>
                You can see some of them on this site or linked below.
                <br/>
                Have fun <i>spinning</i>.
              </Typography>
            </CardContent>
            <CardActions style={{justifyContent: 'center'}}>
               {spinControl}
               <Button size="small" variant="contained" color="secondary"
                       onClick={reset}>Reset</Button>
               {swapControl}
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>{Links}</Grid>
      </Grid>
    </Container>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
