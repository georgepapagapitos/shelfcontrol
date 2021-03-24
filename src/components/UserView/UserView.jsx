import { Divider, Typography, makeStyles, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

function UserView() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const orders = useSelector((store) => store.orders);
  const user = useSelector((store) => store.user);

  const date = moment().format();

  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_ORDERS'
    });
    dispatch({
      type: 'FETCH_ACTIVE_CART'
    });
  }, []);

  const handleFinish = (order) => {
    console.log('finished', order);
    dispatch({
      type: 'FINISH_BOOK',
      payload: {
        order: order,
        date: date
      }
    });
  }

  return (
    <div className="container">
      <Typography gutterBottom variant="h5" align="left" component="div">
        Welcome, {user.first_name}
      </Typography>
      <Divider/>
      <Typography variant="h2" component="div" align="center">
        Book History
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {order.title}
                </TableCell>
                <TableCell align="right">
                  {moment(order.order_date).format('MMM DD YYYY')}
                </TableCell>
                <TableCell align="right">
                  {(order.is_fulfilled && order.date_completed === null) ? <Button align="right" variant="contained" color="primary" type="button" onClick={() => handleFinish(order)}>Finished</Button> : 
                  (order.is_fulfilled && order.date_completed) ? `Finished - ${moment(order.date_completed).format('MMM DD YYYY')}` : 'On the way!'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserView
