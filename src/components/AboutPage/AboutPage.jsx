import { Typography, Paper } from '@material-ui/core';
import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div>
      <center>        
        <Typography style={{marginTop: 50}} variant="h3" component="h1" gutterBottom>Thanks!</Typography>
        <Typography variant="h5" component="h2">Technologies Used:</Typography>
          <ul style={{listStyleType:"none", marginRight:50}}>
            <li><Typography>React</Typography></li>
            <li><Typography>Express</Typography></li>
            <li><Typography>Postgres</Typography></li>
            <li><Typography>Node.js</Typography></li>
            <li><Typography>Google Books API</Typography></li>
          </ul>
      </center>
    </div>
  );
}

export default AboutPage;
