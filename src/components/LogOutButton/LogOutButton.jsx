import { useDispatch } from 'react-redux';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

function LogOutButton(props) {

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    Swal.fire({
      title: 'Are you ready to logout?',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#f50057',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if(result.isConfirmed) {
        dispatch({
          type: 'LOGOUT'
        });
        history.push('/login');
      }
    })
  }

  return (
    <ExitToAppOutlinedIcon
      style={{fill: "white"}}
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={handleClick}
    >
      Log Out
    </ExitToAppOutlinedIcon>
  );
}

export default LogOutButton;
