import React, { Component } from 'react'
import kiwi from './images/kiwi.png'
import trex from './images/komodo.png'
import komodo from './images/trex.png'
import gArrow from './images/green_arrow.png'
import rArrow from './images/red_arrow.png'
import gitlab from './images/gitlab.png'
import resume from './images/resume.png'
import './App.css'

const imgs = [kiwi, trex, komodo]
const clickableStyle = {cursor: "pointer",
                       textDecoration: "underline"}
const leftStyle = {display: "inline-block"}

const FASTER = 0
const SLOWER = 1

function spinImgAt(secs) {
  return {
    animation: `App-logo-spin infinite ${secs}s linear`,
    cursor: "pointer"
  }
}

function createControl(name, fn) {
  return (<div style={leftStyle}>
            <div>
              <img
                className="arrow"
                style={clickableStyle}
                onClick={fn(FASTER)}
                src={rArrow}
                alt="arrow"/>
            </div>
            {name}
            <div>
              <img
                className="garrow"
                style={clickableStyle}
                onClick={fn(SLOWER)}
                src={gArrow}
                alt="arrow"
              />
            </div>
          </div>)
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
                  imgIdx: Math.trunc(Math.random() * imgs.length),
                  spinSpeed: 3,
                  swapSpeed: 3000
                 }
    this.imgTick = this.imgTick.bind(this)
    this.spin = this.spin.bind(this)
    this.swap = this.swap.bind(this)
    this.swapTimer = setInterval(this.imgTick, this.state.swapSpeed)
  }

  imgTick() {
    if (this.state == null) return
    let newIdx = this.state.imgIdx + 1
    if (newIdx === imgs.length) {
      newIdx = 0
    }
    this.setState({imgIdx: newIdx})
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
      console.log(`spin speed = ${newSpeed}s`)
      this.setState({spinSpeed: newSpeed})
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
      console.log(`swap speed = ${newSpeed}ms`)
      clearInterval(this.swapTimer)
      this.setState(
        {swapSpeed: newSpeed},
        (newState)=> {this.swapTimer = setInterval(this.imgTick, newSpeed)})
    }
  }

  render() {
    const {imgIdx, spinSpeed} = this.state
    const logo = imgs[imgIdx]
    const spinStyle = spinImgAt(spinSpeed)
    return (
      <div className="App">
        <div className="App-header">
          {/* Title */}
          <div>
            <h2>reatret.net</h2>
            <h5> by Daniel Loera </h5>
          </div>
          {/* Spinning Image */}
          <img src={logo}
               className="App-logo"
               alt="logo"
               style={spinStyle}/>
          {/* Bottom Text + Controls */}
          <div className="controls">
            {createControl("Spin", this.spin)}
            <div style={leftStyle} className="text">
              <p>
                I'll update this one day, I swear.
                <br></br>
                <span>
                  For now, have fun with these guys.
                </span>
              </p>
            </div>
            {createControl("Swap", this.swap)}
          </div>
          {/* Links */}
          <div>
            <div className="imgLinkItem">
              <a href="https://gitlab.com/danielloera">
                <img src={gitlab} alt="gitlab" className="imgLink"/>
                <div style={{marginBottom: "3vh"}}>
                  Gitlab
                </div>
              </a>
            </div>
            <div className="imgLinkItem">
              <a href="https://docs.google.com/document/d/18sWdFkdfeEGWD7KpvNJ7I25CUm_n0n1hrINJsOv3VzA">
                <img src={resume} alt="resume" className="imgLink"/>
                <div style={{marginBottom: "3vh"}}>
                  Resume
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
