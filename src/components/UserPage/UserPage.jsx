import { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import AdminView from '../AdminView/AdminView';
import UserView from '../UserView/UserView';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: 'FETCH_ALL_ORDERS'
  //   })
  // }, [])

  return (
    <div className="container">
      {user.auth_level === 'ADMIN' && <AdminView />}
      {user.auth_level === 'USER' && <UserView />}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
