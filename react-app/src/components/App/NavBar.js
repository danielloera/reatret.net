import React, { useState } from 'react'
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
    marginRight: theme.spacing(2),
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

function NavBar(props) {
  const { classes } = props
  const [openDrawer, setOpenDrawer] = useState(false)
  function onDrawerChange(openState) {
    setOpenDrawer(openState)
  }
  return (
    <HideOnScroll {...props}>
      <AppBar position="sticky">
         <Toolbar>
            <IconButton
              className={classes.menuButton}
              aria-label="Open drawer"
              onClick={() => setOpenDrawer(true)}>
              <MenuIcon/>
            </IconButton>
            <Link to='/' style={{textDecoration: 'none', color: 'white'}}>
              <Typography variant="h5">
              reatret.net
              </Typography>
            </Link>
         </Toolbar>
         <TempDrawer opened={openDrawer} onChange={onDrawerChange}/>
      </AppBar>
    </HideOnScroll>)
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavBar)
