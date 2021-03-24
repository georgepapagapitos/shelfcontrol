import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

import { Button, Card } from '@material-ui/core';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />
      <center>
        <Button
          variant="contained"
          color="primary"
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
