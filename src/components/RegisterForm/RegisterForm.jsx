import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [readingGradeLevel, setReadingGradeLevel]= useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const userToDispatch = {
    username,
    password,
    firstName,
    lastName,
    age,
    readingGradeLevel
  }

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: userToDispatch
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="age">
          Age:
          <input
            type="number"
            name="age"
            value={age}
            required
            onChange={(event) => setAge(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="readingGradeLevel">
          Reading Grade Level:
          <select value={readingGradeLevel} onChange={event => setReadingGradeLevel(event.target.value)}>
            <option value='0'>Kindergarten</option>
            <option value='1'>First Grade</option>
            <option value='2'>Second Grade</option>
            <option value='3'>Third Grade</option>
            <option value='4'>Fourth Grade</option>
            <option value='5'>Fifth Grade</option>
            <option value='6'>Sixth Grade</option>
          </select>
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
