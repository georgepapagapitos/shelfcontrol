import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  console.log('user', user);
  return (
    <div className="container">

      {user.auth_level === 'ADMIN' && 
        <h1>ADMIN PAGE</h1>
      }

      {user.auth_level === 'USER' &&
        <>
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        </>}

        <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
