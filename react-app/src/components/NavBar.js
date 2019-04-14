import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import TempDrawer from './TempDrawer'

const styles = (theme) => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  bar: {
    marginBottom: "0vw"
  }
})

class NavBar extends Component {

  constructor(props) {
    super(props)
    this.openDrawer = this.openDrawer.bind(this)
    this.state = {drawerOpen: false}
  }

  openDrawer() {
    this.setState({drawerOpen: true})
  }

  render() {
    const {classes} = this.props
    return (
      <AppBar position="static"
              color="primary"
              className={classes.bar}>
         <Toolbar>
            <IconButton
              className={classes.menuButton}
              aria-label="Open drawer"
              onClick={this.openDrawer}>
              <MenuIcon/>
            </IconButton>
            <Link to='/' style={{ textDecoration: 'none' }}>
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

export default withStyles(styles)(NavBar)



