import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import TempDrawer from './TempDrawer'

const styles = (theme) => ({
  menuButton: {
    marginRight: theme.spacing.unit*2,
  }
})

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
      <Slide appear={true} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};


class NavBar extends Component {

  constructor(props) {
    super(props)
    this.openDrawer = this.openDrawer.bind(this)
    this.state = {
      drawerOpen: false,
    }
  }

  openDrawer() {
    this.setState({drawerOpen: true})
  }

  render() {
    const {classes} = this.props
    return (
      <HideOnScroll {...this.props}>
        <AppBar position="sticky">
           <Toolbar>
              <IconButton
                className={classes.menuButton}
                aria-label="Open drawer"
                onClick={this.openDrawer}>
                <MenuIcon/>
              </IconButton>
              <Link to='/' style={{textDecoration: 'none', color: 'white'}}>
                 <Typography variant="h5">
                 reatret.net
                 </Typography>
              </Link>
           </Toolbar>
           <TempDrawer opened={this.state.drawerOpen}/>
        </AppBar>
      </HideOnScroll>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavBar)



