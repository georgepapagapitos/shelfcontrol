import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
import { IconButton, AppBar, Toolbar, Typography} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  },
}));

function Nav() {
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);

  let loginLinkData = {
    path: '/login',
    text: "Login / Register"
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = <AccountCircleOutlinedIcon style={{fill: "white"}}/>;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h3" noWrap>
            Shelf Control
          </Typography>
          {user.id && (
              <IconButton edge="end" className={classes.menuButton} aria-label="home">
                <Link to="/books">
                  <HomeIcon style={{fill: "white"}}/>
                </Link>
              </IconButton>
            )}
          <IconButton edge="end" className={classes.menuButton} aria-label="user">
            <Link to={loginLinkData.path}>
              {loginLinkData.text}
            </Link>
          </IconButton>
          {user.auth_level === 'USER' && (            
            <IconButton edge="end" className={classes.menuButton} aria-label="cart">
              <StyledBadge badgeContent={cart.length} color="secondary">
                <Link to="/cart">
                  <ShoppingCartIcon style={{fill: "white"}}/>
                </Link>
              </StyledBadge>
            </IconButton>
          )}
          {user.id && 
            <IconButton edge="end" className={classes.menuButton} aria-label="logout">
              <LogOutButton />
            </IconButton>}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Nav;
