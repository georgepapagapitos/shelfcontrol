import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

function UserView() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);


  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_ORDERS'
    });
    dispatch({
      type: 'FETCH_ACTIVE_CART'
    });
  }, [])

  const orders = useSelector((store) => store.orders);
  console.log('orders', orders)
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
      <Typography variant="subtitle1" align="left" component="div">
        Your username is: {user.username}
      </Typography>
      <hr/>
      <Typography variant="h1" component="div" align="left">
        Book History
      </Typography>
      <table>
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
      </table>
    </div>
  )
}

export default UserView
