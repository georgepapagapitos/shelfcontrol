import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import './AdminView.css';

function AdminView() {

  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders);

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
      <h1>ADMIN PAGE</h1>
      <div className="orders-container">
        {orders.map((order, i) => {
          return (
            <div key={i} className="order-item">
            <details>
              <summary>Order ID: {order.id} - {order.first_name} {order.last_name}</summary>
              <ul>
                {order.books.map((book, i) => {
                  return (
                    <li key={i}>{book}</li>
                  )
                })}
                {order.is_fulfilled ? <p>Order Sent</p> :
                <Button type="button" variant="contained" color="primary" onClick={() => markOrderSent(order.id)}>Mark Sent</Button>}
              </ul>
            </details>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdminView
