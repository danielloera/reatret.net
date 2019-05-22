import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import TempDrawer from './TempDrawer'

const HIDE_SPEED = 0.4

const styles = (theme) => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  bar: {
    marginBottom: "0vw",
    position: 'sticky',
    top: 0
  },
  show: {
    transform: 'translateY(0)',
    transition: `transform ${HIDE_SPEED}s`,
  },
  hide: {
    transform: 'translateY(-110%)',
    transition: `transform ${HIDE_SPEED}s`,
  },
})

class NavBar extends Component {

  constructor(props) {
    super(props)
    this.openDrawer = this.openDrawer.bind(this)
    this.state = {
      drawerOpen: false,
      shouldShow: null
    }
    this.lastScroll = null
    this.handleScroll = _.throttle(this.handleScroll.bind(this), 100)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(evt) {
    const lastScroll = window.scrollY
    if (lastScroll === this.lastScroll) {
      return
    }
    const shouldShow = (this.lastScroll !== null) ?  (lastScroll < this.lastScroll) : null
    if (shouldShow !== this.state.shouldShow) {
      this.setState((prevState, props) => {
        return {
            drawerOpen: false,
            shouldShow: shouldShow
          }
      })
    }
    this.lastScroll = lastScroll
  }

  openDrawer() {
    this.setState({drawerOpen: true})
  }

  render() {
    const {classes} = this.props
    const barClass = (`${classes.bar} ${
              this.state.shouldShow === null ? '' : (
                this.state.shouldShow ? classes.show : classes.hide
              )
            }`)
    return (
      <AppBar position="static"
              color="primary"
              className={barClass}>
         <Toolbar>
            <IconButton
              className={classes.menuButton}
              aria-label="Open drawer"
              onClick={this.openDrawer}>
              <MenuIcon/>
            </IconButton>
            <Link to='/' style={{textDecoration: 'none'}}>
               <Typography variant="h5">
               reatret.net
               </Typography>
            </Link>
         </Toolbar>
         <TempDrawer opened={this.state.drawerOpen}/>
      </AppBar>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavBar)



