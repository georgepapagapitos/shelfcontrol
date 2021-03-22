import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './AdminView.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
}));

function AdminView() {

  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders);
  const classes = useStyles();

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
    <div className="container">
      <Typography variant="h2" align="center">Admin Page</Typography>
      {orders.map((order, i) => {

        let orderLabel = `Order ID: ${order.id}`;
        let userFullName = `${order.first_name} ${order.last_name}`;

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
              {userFullName}
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <ul>
            {order.books.map((book, i) => {
                return (
                  <li>
                    {book}
                  </li>
                )
              })}
              {order.is_fulfilled ? <div><Typography variant="body2">Order Sent</Typography></div> :
                <Button type="button" variant="contained" color="primary" onClick={() => markOrderSent(order.id)}>Mark Sent</Button>}
            </ul>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}

export default AdminView
