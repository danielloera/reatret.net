import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SpiralIcon from '@material-ui/icons/ScatterPlot'
import HomeIcon from '@material-ui/icons/Home'
import VoiceIcon from '@material-ui/icons/RecordVoiceOver'
import CodeSwitchIcon from '@material-ui/icons/Language'

// List of all Drawer Items
const DRAWER_LIST = [
  {
    text: "Home",
    icon: (<HomeIcon/>),
    link: "/",
    divider: true
  },
  {
    text: "Code-Switching RNN",
    icon: (<CodeSwitchIcon/>),
    link: "/codeswitching"
  },
  {
    text: "Ulam Spirals",
    icon: (<SpiralIcon/>),
    link: "/primeulam"
  },
  {
    text: "UT Tower Bot",
    icon: <VoiceIcon/>,
    link: "/uttower",
  },
]

const styles = {
  list: {
    minWidth: 'calc(10ch + 10vw)',
    maxWidth: 'calc(20ch + 10vw)',
  }
}

function createList(dList) {
  return (
    <List>
      {DRAWER_LIST.map((dItem) => {
        const divider = dItem.divider ? <Divider/> : null
        return (
          <Link to={dItem.link} key={dItem.text}>
            <ListItem button>
              <ListItemIcon>{dItem.icon}</ListItemIcon>
              <ListItemText primary={dItem.text}/>
            </ListItem>
            {divider}
          </Link>)
      })}
    </List>
  )
}

class TempDrawer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.open !== nextProps.opened) {
      this.setState({open: nextProps.opened})
    }
  }

  toggle(state) {
    return () => this.setState({
      open: state
    })
  }

  render() {
    const { classes } = this.props

    const sideList = (
      <div className={classes.list}>
        {createList(DRAWER_LIST)}
      </div>
    )

    return (
      <div>
        <Drawer open={this.state.open} onClose={this.toggle(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggle(false)}
            onKeyDown={this.toggle(false)}>
            {sideList}
          </div>
        </Drawer>
      </div>
    )
  }
}

TempDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TempDrawer)
