import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { getTunables } from './TunablesClient'
import beautify from 'json-beautify'

const URL = 'https://prod.cloud.rockstargames.com/titles/gta5/pcros/0x1a098062.json'

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  fileUpload: {
    display: "flex",
    justifyContent: "center"
  },
})

function CodeSwitching(props) {
  const { classes } = props
  const [decryptedTunables, setDecryptedTunables] = useState(null)

  const onFileChange = (event) => {
    getTunables(event.target.files[0]).then((tunables) => {
      setDecryptedTunables(beautify(JSON.parse(tunables), null, 2, 100))
    })
  }

  return (
    <Container className={classes.root}>
      <Grid container spacing={4} justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography align="center" variant="h5">GTA V Tunables Decrypter</Typography>
          <Typography align="center" variant="subtitle1">
            Download the{" "}
            <a href={URL}>
              encrypted file
            </a> and upload it below to decrypt.
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.fileUpload}>
          <input type="file" onChange={onFileChange}/>
        </Grid>
        <Grid item xs={12} className={classes.fileUpload}>
          <p>{decryptedTunables}</p>
        </Grid>
      </Grid>
    </Container>
  )
}

CodeSwitching.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CodeSwitching)
