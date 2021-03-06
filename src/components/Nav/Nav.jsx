import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { IconButton, AppBar, Toolbar, Typography} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

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
    marginLeft: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  right: {
    display:"flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  offset: theme.mixins.toolbar,
}));

function Nav() {

  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);
  const orders = useSelector((store) => store.orders);

  let newOrders = orders.filter(order => !order.is_fulfilled);

  let loginLinkData = {
    path: '/login',
    text: ""
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = <AccountCircleIcon style={{fill: "white"}}/>;
  }

  return (
    <div>
      <AppBar>
        <Toolbar style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          {!user.id && (
            <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}><Typography className={classes.title} variant="h5">ShelfControl</Typography></Link>
          )}
          <div className={classes.right}>
          {user.id && (
            <IconButton edge="end" className={classes.menuButton} aria-label="home">
              <Link to="/books">
                <HomeIcon style={{fill: "white"}}/>
              </Link>
            </IconButton>
          )}
          {user.auth_level === 'ADMIN' && (
            <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="add">
              <Link to="/add">
                <LibraryAddIcon style={{fill: "white"}}/>
              </Link>
            </IconButton>
            )}
          <IconButton edge="end" className={classes.menuButton} aria-label="user">
            {user.auth_level === 'ADMIN' ? 
              <StyledBadge badgeContent={newOrders.length} color="secondary">
                <Link to={loginLinkData.path}>
                  {loginLinkData.text}
                </Link>
              </StyledBadge> :
              <Link to={loginLinkData.path}>
                {loginLinkData.text}
              </Link>
            }
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
            </IconButton>
          }
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  )
}

export default Nav;
