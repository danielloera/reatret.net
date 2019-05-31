import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import NotFound from './404'
import NavBar from './NavBar'
import Home from '../Home/Home'
import PrimeUlam from '../PrimeUlam/PrimeUlam'
import UTTower from '../UTTower/UTTower'
import CodeSwitching from '../CodeSwitching/CodeSwitching'
import uuidv1 from 'uuid/v1'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB0lviQhHULr0YBUU0OSZ6r1d-cX_YMJVY",
  authDomain: "reatret-net.firebaseapp.com",
  databaseURL: "https://reatret-net.firebaseio.com",
  projectId: "reatret-net",
  appID: "1:30853517185:web:e0fd6eae325a6e5a",
};
firebase.initializeApp(firebaseConfig);



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
  const db = firebase.firestore()
  // Set uuid in local storage and firebase
  useEffect(() => {
    const collection = db.collection('uuids')
    let id = localStorage.getItem('uuid')
    let currDoc = null
    if (id) currDoc = collection.doc(id)
    if (!id) {
      id = uuidv1()
      localStorage.setItem('uuid', id)
      currDoc = collection.doc(id)
      currDoc.set({})
    }
  }, [])
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <NavBar/>
        <Switch className={classes.root}>
          <Route exact path='/' render={(p) => <Home {...p} db={db}/>}/>
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
