import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, makeStyles, Typography, TextField, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';
import moment from 'moment';

import './AdminView.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title: {
    marginTop: 20
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  searchContainer: {
    display: 'flex',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginLeft: '20px',
    paddingLeft: '10px',
    paddingRight: '20px',
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: 'flex-end',
    marginBottom: '5px',
  },
  searchInput: {
    width: '200px',
    margin: "5px",
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2'
    },
  },
}));

function AdminView() {

  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders);
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    dispatch({
      type: 'FETCH_ALL_ORDERS'
    })
  }, []);

  const markOrderSent = (orderId) => {
    console.log('marked order sent with id of:', orderId);
    dispatch({
      type: 'MARK_ORDER_SENT',
      payload: {orderId}
    })
  }

  return (
    <div>
      <Typography variant="h3" align="center" component="div" className={classes.title} gutterBottom>Admin Page</Typography>
      <div className={classes.searchContainer}>
        <SearchIcon className={classes.searchIcon} />
        <TextField className={classes.searchInput} onChange={(event) => {setNameFilter(event.target.value)}} label="Search by name" variant="standard" />
      </div>
      {orders.map((order, i) => {

        let orderLabel = order.is_fulfilled ? <DoneIcon /> : `Order #${order.id}`
        let userFullName = `${order.first_name} ${order.last_name}`;
        if(userFullName.toLowerCase().includes(nameFilter.toLowerCase())) {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
            <Typography className={classes.heading}>{orderLabel}</Typography>
            <Typography className={classes.secondaryHeading}>
              {userFullName} <Divider/> {moment(order.order_date).format('MM-DD-YYYY')}
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <ul>
            {order.books.map((book, i) => {
                return (
                  <li>
                    <Typography variant="caption">{book}</Typography>
                  </li>
                )
              })}
              {!order.is_fulfilled &&<Button size="small" type="button" variant="contained" color="primary" onClick={() => markOrderSent(order.id)}>Mark Sent</Button>}
            </ul>
            </AccordionDetails>
          </Accordion>
        )
        }
      })}
    </div>
  )
}

export default AdminView
