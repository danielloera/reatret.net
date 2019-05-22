import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import LabeledWord from './LabeledWord'

const DEFAULT_INPUT = "Hola, how are you?"
const API_URL = "http://54.218.147.176/codeswitch"

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 4
  },
  button: {
    margin: theme.spacing.unit
  },
  labeledWords: {
    justifyContent: "center",
  }
})

class CodeSwitching extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputText: null,
      labeledData: null
    }
    this.inputTextChange = this.inputTextChange.bind(this)
    this.labelText = this.labelText.bind(this)
  }

  componentDidMount() {
    this.setState({
      inputText: DEFAULT_INPUT
    }, () => this.labelText())
  }

  setLoading(loading, then) {
    this.setState({loading: loading}, then)
  }

  inputTextChange(event) {
    this.setState({
      inputText: event.target.value
    })
  }

  labelText() {
    const { inputText } = this.state
    if (!inputText) return
    this.setLoading(true, (nextState) => {
      axios.post(API_URL, {text: inputText}).then((response) => {
        this.setState({
          labeledData: response.data,
          loading: false
        })
      })
    })
  }

  getLabeledWords() {
    const { labeledData } = this.state
    if (!labeledData || labeledData.length < 1) return
    const labeledWords = []
    for (let i = 0; i < labeledData.words.length; i++) {
      labeledWords.push(<LabeledWord key={i}
                          word={labeledData.words[i]}
                          label={labeledData.labels[i]}/>)
    }
    return labeledWords
  }

  render() {
    const { classes } = this.props
    const { loading } = this.state
    return (
      <div className={classes.root}>
       <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
        open={loading}
        onClose={()=> this.setState({loading: false})}
        ContentProps={{'aria-describedby': 'message-id'}}
        message="Generating labels..."/>
        <Grid container spacing={24} justify="center" alignItems="center" direction="row">
          <Grid item xs={12}>
            <Typography align="center" variant="h5">Spanglish Code-Switching Labeler</Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            <TextField
              label="Input Text"
              defaultValue={DEFAULT_INPUT}
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={this.inputTextChange}
              />
          </Grid>
          <Grid item xs={4} sm={3} md={1} lg={1}>
            <Button variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={this.labelText}>
              Label
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className={classes.labeledWords}>
              {this.getLabeledWords()}
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

CodeSwitching.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CodeSwitching)
