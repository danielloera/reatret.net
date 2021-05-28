import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor, secondaryColor } from '../App/App'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const styles = (theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    justifyContent: "center",
  },
  labelText: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
  }
})

function getMargin(w1, w2) {
  if (w1 >= w2) {
      return Math.floor((w1 - w2) / 2)
  }
  return 0
}

function getColor(label) {
  switch(label) {
    case "es": return primaryColor
    case "en": return secondaryColor
    default: return "gray"
  }
}

function LabeledWord(props) {
  const { label, word, classes } = props
  const labelWidth = label.length + 2
  const labelMarginLeft = getMargin(word.length, labelWidth)
  const wordMarginLeft = getMargin(labelWidth + 1, word.length)
  return (
    <div className={classes.root}>
      <Paper elevation={4}
             style={{
              backgroundColor: getColor(label),
              marginLeft: `${labelMarginLeft}rem`,
              width: `${labelWidth}rem`
            }}>
        <Typography variant="h6" className={classes.labelText}>
          {label.toUpperCase()}
        </Typography>
      </Paper>
      <Typography variant="h5"
                  style={{marginLeft: `${wordMarginLeft}rem`}}>
        {word}
      </Typography>
    </div>
  )
}

LabeledWord.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LabeledWord)
