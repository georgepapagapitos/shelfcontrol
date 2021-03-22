import { Divider, Typography, makeStyles, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment';

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

  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_ORDERS'
    });
    dispatch({
      type: 'FETCH_ACTIVE_CART'
    });
  }, []);

  const handleFinished = () => {
    console.log('finished');
  }

  return (
    <div className="container">
      <Typography variant="h3" align="left" component="div">
        Welcome, {user.first_name}
      </Typography>
      <Typography variant="subtitle1" align="left" component="div">
        Your ID is: {user.id}
      </Typography>
      <Typography gutterBottom variant="subtitle1" align="left" component="div">
        Your username is: {user.username}
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
                  {moment(order.order_date).format('MM-DD-YYYY')}
                </TableCell>
                <TableCell align="right">
                  {(order.is_fulfilled && order.date_completed === null) ? <Button align="right" variant="contained" color="primary" type="button" onClick={handleFinished}>Finished</Button> : 
                  (order.is_fulfilled && order.date_completed) ? 'Book Finished!' : 'On the way!'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <table>
        <thead>
        <tr>
          <th>Book Title</th>
          <th>Date Ordered</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order, i) => {
          if(!order.is_active) {
            return (
            <tr key={i}>
              <td>{order.title}</td>
              <td>{order.order_date}</td>
              {(order.is_fulfilled && order.date_completed === null) ? <td><button type="button" onClick={handleFinished}>Finished</button></td> : 
                (order.is_fulfilled && order.date_completed) ? <td>Book Finished!</td> : <td>On the way!</td>}
            </tr>
          )
          }
        })}
        </tbody>
      </table> */}

    </div>
  )
}

export default UserView
