import { Typography, Paper } from '@material-ui/core';
import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
      <Paper>
        <Typography align="center">This about page is for anyone to read!</Typography>
      </Paper>
  );
}

export default AboutPage;
