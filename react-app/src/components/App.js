import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Home from './Home'
import NavBar from './NavBar'

const styles = (theme) => ({
    root: {
      flexGrow: 1,
    }
  }
)

const theme = createMuiTheme(
  {
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#b39ddb'
      },
    secondary: {
      main: '#f48fb1'
      }
    }
  }
)

class App extends Component {

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <CssBaseline/>
        <MuiThemeProvider theme={theme}>
          <NavBar/>
            <Switch>
              <Route exact path='/' component={Home}/>
            </Switch>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(App)
