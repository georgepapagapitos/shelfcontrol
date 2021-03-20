import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import AdminView from '../AdminView/AdminView';
import UserView from '../UserView/UserView';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  
  return (
    <div className="container">

      {user.auth_level === 'ADMIN' && 
        <AdminView />
      }

      {user.auth_level === 'USER' &&
        <UserView />
      }

        <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
