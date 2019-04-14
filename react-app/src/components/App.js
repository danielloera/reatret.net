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
    type: 'dark',
    primary: {
        main: '#43a047',
      },
    secondary: {
        main: '#ff80ab',
      }
    }
  }
)

class App extends Component {

  render() {
    const {classes} = this.props
    return (
      <React.Fragment className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline/>
          <NavBar/>
            <Switch>
              <Route exact path='/' component={Home}/>
            </Switch>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(App)
