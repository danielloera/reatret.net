import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

function createLinks(links) {
  return links.map((item) => (
    <span key={item.name}
          style={{
            display: "inline-block",
            textAlign: "center",
            margin: '1vw'
          }}>
      <a href={item.link}>
      <IconButton aria-label={item.name}>
      {item.icon}
      </IconButton>
      <div>
        <Typography variant="body2"
          style={{textDecoration: 'none', color: 'white'}}>
        {item.name}
        </Typography>
      </div>
      </a>
    </span>)
  )
}

export { createLinks }