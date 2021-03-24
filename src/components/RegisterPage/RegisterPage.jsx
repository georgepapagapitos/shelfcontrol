import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

import { Button, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 350,
    paddingTop: 25,
    paddingBottom: 25
  }
}))

function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
    <center>
      <Paper className={classes.root}>
        <RegisterForm />
      </Paper>
      <Button
        color="primary"
        type="button"
        onClick={() => {
          history.push('/login');
        }}
      >
        Login
      </Button>
    </center>
    </>
  );
}

export default RegisterPage;
