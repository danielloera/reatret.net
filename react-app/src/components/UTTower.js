import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  botHolder: {
    display: 'inline-block',
    marginTop: theme.spacing.unit * 6,
  },
  endingText: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 10,
  },
})

class UTTower extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
  }

  updateDimensions() {
    const ratio = window.innerWidth / window.innerHeight
    const opRatio = window.innerHeight / window.innerWidth
    const defaultWidth = window.innerWidth * 0.80
    const defaultHeight = window.innerHeight * 0.80
    const height = ratio > 1.5 ? window.innerHeight / ratio : window.innerHeight / opRatio
    const width = ratio > 1.5 ? window.innerWidth / ratio : window.innerWidth / opRatio
    this.setState({
      width: Math.min(width, defaultWidth),
      height: Math.max(height, defaultHeight)
    })
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  render() {
    const { classes } = this.props
    const { width, height } = this.state
    return (
      <div className={classes.root}>
        <Paper className={classes.botHolder} elevation={8}>
          <iframe
            title="UT Tower"
            allow="microphone;"
            width={width}
            height={height}
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
