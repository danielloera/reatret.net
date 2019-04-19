import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import NavBar from './NavBar'
import Home from './Home'
import PrimeUlam from './PrimeUlam'
import UTTower from './UTTower'
import './App.css'

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
    fontSize: 16,
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
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline/>
          <NavBar/>
            <Switch className={classes.root}>
              <Route exact path='/' component={Home}/>
              <Route exact path='/primeulam' component={PrimeUlam}/>
              <Route exact path='/uttower' component={UTTower}/>
            </Switch>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(App)
