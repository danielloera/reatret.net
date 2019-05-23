import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

function createLinks(links) {
  return links.map((item) => (
    <span key={item.name}
          style={{
            display: "inline-block",
            textAlign: "center",
            margin: '5px'
          }}>
      <a href={item.link} download>
      <IconButton aria-label={item.name}>
      {item.icon}
      </IconButton>
      <div>
        <Typography>
        {item.name}
        </Typography>
      </div>
      </a>
    </span>)
  )
}

export { createLinks }