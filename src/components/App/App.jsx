import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import EditBookView from '../EditBookView/EditBookView';

import './App.css';
import BookListView from '../BookListView/BookListView';
import CartView from '../CartView/CartView';
import AddBookForm from '../AddBookForm/AddBookForm';
import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  const user = useSelector(store => store.user);

  return (
    <>
    <CssBaseline />
    <Router>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/user"
          >
            <LandingPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/cart">
            <CartView />
          </ProtectedRoute>

          <ProtectedRoute exact path='/books'>
              <BookListView />
          </ProtectedRoute>

          {user.auth_level === 'ADMIN' && 
          <ProtectedRoute exact path="/add">
            <AddBookForm />
          </ProtectedRoute>
          }

          {user.auth_level === 'ADMIN' && 
          <ProtectedRoute exact path="/edit/:id">
            <EditBookView />
          </ProtectedRoute>
          }

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <Typography component="span" align="center" variant="h2" style={{paddingTop: 40}}>404</Typography>
          </Route>
        </Switch>
        <Footer />
    </Router>
    </>
  );
}

export default App;
