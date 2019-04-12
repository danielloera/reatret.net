import React, { Component } from 'react';
import kiwi from './images/kiwi.png';
import trex from './images/komodo.png';
import komodo from './images/trex.png';
import gitlab from './images/gitlab.png';
import './App.css';

const imgs = [kiwi, trex, komodo]
const clickableStyle = {cursor: "pointer",
                       textDecoration: "underline"}
const FASTER = 0
const SLOWER = 1

function spinImgAt(secs) {
  return {
    animation: `App-logo-spin infinite ${secs}s linear`,
    cursor: "pointer"
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
                  imgIdx: 0,
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
    const {imgIdx, spinSpeed} = this.state;
    const logo = imgs[imgIdx]
    const spinStyle = spinImgAt(spinSpeed)
    return (
      <div className="App">
        <header className="App-header">
        <h2>reatret.net</h2>
        <h5> by Daniel Loera </h5>
          <img src={logo}
               className="App-logo"
               alt="logo"
               style={spinStyle}/>
          <p>
            I'll update this one day, I swear. <br></br>
            For now, watch these guys{" "}
            <i>
              spin
            </i>.
          </p>
          <p>
            Spin:{" "}
            <span
              style={clickableStyle}
              onClick={this.spin(FASTER)}>
              faster
            </span>
            {" "}
            <span
              style={clickableStyle}
              onClick={this.spin(SLOWER)}>
              slower
            </span>
            <br></br>
            Swap:{" "}
            <span
              style={clickableStyle}
              onClick={this.swap(FASTER)}>
              faster
            </span>
            {" "}
            <span
              style={clickableStyle}
              onClick={this.swap(SLOWER)}>
              slower
            </span>
          </p>
          <a href="https://gitlab.com/danielloera">
            <span><img src={gitlab} alt="logo" className="gitlab"/> </span>
          </a>
        </header>
      </div>
    );
  }
}

export default App;
