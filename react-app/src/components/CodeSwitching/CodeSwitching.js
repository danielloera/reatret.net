import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import LabeledWord from './LabeledWord'
import CodeIcon from '@material-ui/icons/Code'
import PaperIcon from '@material-ui/icons/Assignment'
import { createLinks } from '../../utils'

const LINKS = [
  {
    name: "Source Code",
    link: "https://gitlab.com/danielloera/nlp-final",
    icon: (<CodeIcon fontSize="large"/>)
  },
  {
    name: "Project PDF",
    link: "https://firebasestorage.googleapis.com/v0/b/reatret-net.appspot.com/o/codeswitching_Jorge_Hernandez_Daniel_Loera.pdf?alt=media&token=5505e0b1-e2d6-4f0a-870d-03891ca8f921",
    icon: (<PaperIcon fontSize="large"/>)
  },
]
const Links = createLinks(LINKS)

const DEFAULT_INPUT = "Hola! Me llamo Daniel. What is your name?"
const API_URL = "https://reatret.net/api/codeswitch/"

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  labeledWords: {
    display: "flex",
    alignItems: "center",
    overflowX: "auto",
    overflowY: "hidden",
    border: "1px solid dimgray",
    borderRadius: "5px",
    padding: theme.spacing(2),
  },
  buttonHolder: {
    display: "flex",
    justifyContent: "center",
  },
  summary: {
    textAlign: "center",
    padding: theme.spacing(3)
  },
  links: {
    display: "flex",
    justifyContent: "center"
  },
})

function CodeSwitching(props) {
  const [inputText, setInputText] = useState(DEFAULT_INPUT)
  const [labeledData, setLabeledData] = useState(null)
  const [lastLabeled, setLastLabeled] = useState(null)
  const [loading, setLoading] = useState(true)

  function labelText() {
    if (!inputText || lastLabeled === inputText) return
    setLastLabeled(inputText)
    setLoading(true)
    axios.post(API_URL, {text: inputText}).then((response) => {
      setLabeledData(response.data)
      setLoading(false)
    })
  }

  function getLabeledWords() {
    if (!labeledData || labeledData.length < 1) return null
    const labeledWords = []
    for (let i = 0; i < labeledData.words.length; i++) {
      labeledWords.push(<LabeledWord key={i}
                          word={labeledData.words[i]}
                          label={labeledData.labels[i]}/>)
    }
    return labeledWords
  }

  useEffect(() => labelText(), [])

  const { classes } = props
  const labeledWords = useMemo(() => {
    if (loading) return <LinearProgress/>
    return <div className={classes.labeledWords}>{getLabeledWords()}</div>
  }, [loading])
  return (
    <Container className={classes.root}>
     <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
      open={loading}
      ContentProps={{'aria-describedby': 'message-id'}}
      message="Generating labels..."/>
      <Grid container spacing={4} justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography align="center" variant="h5">Spanish-English Code-Switching Labeler</Typography>
          <Typography align="center" variant="subtitle1">by{" "}
            <a href="https://gitlab.com/jmhern">
              Jorge Hernandez
            </a> & Daniel Loera
          </Typography>
        </Grid>
        <Grid item xs={10} md={11}>
          <TextField
            label="Input Text" defaultValue={DEFAULT_INPUT} variant="outlined"
            margin="normal" fullWidth
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                ev.preventDefault()
                labelText()
              }
            }}
            />
        </Grid>
        <Grid item xs={2} md={1} className={classes.buttonHolder}>
          <Button variant="contained" color="secondary" onClick={labelText}>
            Label
          </Button>
        </Grid>
        <Grid item xs={12}>
          {labeledWords}
        </Grid>
        <Grid item xs={12} md={10} lg={6}>
          <Paper className={classes.summary} elevation={2}>
            <Typography component="p"variant="body1">
              This research project was developed for{" "}
              <a href="https://www.cs.utexas.edu/~gdurrett/">
                Greg Durrett's
              </a> Natural Language Processing class. It uses a bidirectional RNN,
              trained embeddings, and much more to identify language in english-spanish code-switching
              text. It certainly isn't perfect, but it does a great job with a vast
              amount of sentence types. You can look at the source code or read more about the details
              in the research project linked below. Have fun!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.links}>
          {Links}
        </Grid>
      </Grid>
    </Container>
  )
}

CodeSwitching.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CodeSwitching)
