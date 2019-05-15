import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import torch from 'torch-js'

const styles = (theme) => ({

})

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
