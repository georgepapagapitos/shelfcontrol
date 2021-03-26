import { Typography, Paper } from '@material-ui/core';
import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
        <Typography style={{marginTop: 50}}align="center" variant="h4" component="h1">Thank you!</Typography>
  );
}

export default AboutPage;
