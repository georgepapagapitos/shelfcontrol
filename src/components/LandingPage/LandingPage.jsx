import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import { Button, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 350,
    paddingTop: 25,
    paddingBottom: 25
  }
}))

function LandingPage() {
  const classes = useStyles();
  
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <center>
      <Paper className={classes.root}>
        <RegisterForm />
      </Paper>
          <Typography gutterBottom>Already a Member?</Typography>
          <Button variant="outlined" color="primary" onClick={onLogin}>
            Login
          </Button>
      </center>
  );
}

export default LandingPage;
