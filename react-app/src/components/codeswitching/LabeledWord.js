import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const COLOR = {
  es: "#7986cb",
  en: "#f06292",
  other: "#43a047"
}

function getMargin(w1, w2) {
  if (w1 >= w2) {
      return Math.floor((w1 - w2) / 2)
  }
  return 0
}

const styles = (theme) => ({
  root: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    justifyContent: "center",
  },
  labelText: {
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    textAlign: "center",
  }
})


class LabeledWord extends React.Component {

  render() {
    const { label, word, classes } = this.props
    const labelWidth = label.length + 2
    const labelMarginLeft = getMargin(word.length, labelWidth)
    const wordMarginLeft = getMargin(labelWidth + 1, word.length)
    return (
      <div className={classes.root}>
        <Paper elevation={4}
               style={{
                backgroundColor: COLOR[label],
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
}

LabeledWord.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LabeledWord)
