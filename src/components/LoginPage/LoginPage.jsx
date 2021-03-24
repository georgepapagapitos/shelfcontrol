import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button, Card, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 350,
    paddingTop: 25,
    paddingBottom: 25
  }
}))

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Paper className={classes.root}>
        <LoginForm />
      </Paper>
      <center>
        <Button
          color="primary"
          type="button"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </>
  );
}

export default LoginPage;
