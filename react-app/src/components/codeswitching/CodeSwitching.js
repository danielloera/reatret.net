import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({

})

// EXAMPLE POST:
/*
{
  "text": "Yo me gusta los carros thats awesome, isnt it?"
}
*/

class CodeSwitching extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        Hello
      </div>
    )
  }
}


export default withStyles(styles)(CodeSwitching)
