import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const BOT_WIDTH = window.innerWidth * 0.85
const BOT_HEIGHT = window.innerHeight * 0.80

const styles = (theme) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  botHolder: {
    display: 'inline-block',
    width: BOT_WIDTH,
    height: BOT_HEIGHT,
    marginTop: theme.spacing.unit * 6,
  },
  endingText: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 10,
  },
})

class UTTower extends React.Component {

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Paper className={classes.botHolder} elevation={8}>
          <iframe
            allow="microphone;"
            width={BOT_WIDTH}
            height={BOT_HEIGHT}
            src="https://console.dialogflow.com/api-client/demo/embedded/uttower">
          </iframe>
        </Paper>

        <div className={classes.endingText}>
          <Typography component="p" >
            This bot was created on {" "}
            <a href="https://dialogflow.com">Dialogflow</a>
            {" "}to get lighting updates from the{" "}
            <a href="https://en.wikipedia.org/wiki/Main_Building_(University_of_Texas_at_Austin)">Tower in UT Austin.</a>
            <br/>UT Tower bot is available on{" "}
            <a href="https://assistant.google.com/services/a/uid/0000001deeb5797c?hl=en">Google Assistant</a>
            {" "} and{" "}
            <a href="https://www.facebook.com/utexastower">Facebook Messenger.</a>
          </Typography>
        </div>
      </div>
    )
  }
}

UTTower.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UTTower)
