import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, makeStyles, TextField, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function RegisterForm() {

  const classes = useStyles();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const userToDispatch = {
    username,
    password,
    firstName,
    lastName,
  }

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: userToDispatch
    });
  }; // end registerUser

  return (
    <>
    <Typography variant="h4" align="center" gutterBottom>Register User</Typography>
    <form className={classes.root} onSubmit={registerUser}>  
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <TextField
        variant="outlined"
        size="small"
        type="text"
        label="Username"
        value={username}
        required
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        variant="outlined"
        size="small"
        type="password"
        label="Password"
        value={password}
        required
        onChange={(event) => setPassword(event.target.value)}
      />
      <TextField
        variant="outlined"
        size="small"
        type="text"
        label="First Name"
        value={firstName}
        required
        onChange={(event) => setFirstName(event.target.value)}
      />
      <TextField
        variant="outlined"
        size="small"
        type="text"
        label="Last Name"
        value={lastName}
        required
        onChange={(event) => setLastName(event.target.value)}
      />
      <div>
        <Button variant="contained" color="primary" type="submit" name="submit">Register</Button>
      </div>
    </form>
    </>
  );
}

export default RegisterForm;
