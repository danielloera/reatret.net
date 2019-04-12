import React, { Component } from 'react';
import kiwi from './images/kiwi.png';
import trex from './images/komodo.png';
import komodo from './images/trex.png';
import gitlab from './images/gitlab.png';
import './App.css';

const imgs = [kiwi, trex, komodo]

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {imgIdx: 0}
    this.imgTick = this.imgTick.bind(this)
  }

  componentDidMount() {
    setInterval(this.imgTick, 1000 * 3)
  }

  imgTick() {
    if (this.state == null) return
    let newIdx = this.state.imgIdx + 1
    if (newIdx === imgs.length) {
      newIdx = 0
    }
    this.setState({imgIdx: newIdx})
  }

  render() {
    const logo = imgs[this.state.imgIdx]
    return (
      <div className="App">
        <header className="App-header">
        <h2>reatret.net</h2>
        <h5> by Daniel Loera </h5>
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            I'll update this one day, I swear. <br></br>
            For now, watch these guys <i>spin</i>.
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
