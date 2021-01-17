import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import NotFound from './404'
import NavBar from './NavBar'
import Home from '../Home/Home'
import PrimeUlam from '../PrimeUlam/PrimeUlam'
import UTTower from '../UTTower/UTTower'
import CodeSwitching from '../CodeSwitching/CodeSwitching'

const styles = (theme) => ({
    root: {
      flexGrow: 1,
    }
  }
)

const primaryColor = '#43a047'
const secondaryColor = '#ff4081'
const theme = createMuiTheme(
  {
    typography: {
      fontSize: 16,
    },
    palette: {
      type: 'dark',
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      }
    }
  }
)

function App(props) {
  const { classes } = props
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <NavBar/>
        <Switch className={classes.root}>
          <Route exact path='/' component={Home}/>
          <Route exact path='/primeulam' component={PrimeUlam}/>
          <Route exact path='/uttower' component={UTTower}/>
          <Route exact path='/codeswitching' component={CodeSwitching}/>
          <Route component={NotFound}/>
        </Switch>
      </MuiThemeProvider>
    </React.Fragment>
  )
}

export { secondaryColor, primaryColor }
export default withStyles(styles)(App)
