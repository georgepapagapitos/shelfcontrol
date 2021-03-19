import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

function UserView( {user} ) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_ORDERS'
    })
  }, [])

  const orders = useSelector((store) => store.orders);

  return (
    <div className="container">
        <h2>Welcome, {user.first_name}!</h2>
        <p>Your ID is: {user.id}</p>
        <p>Your username is: {user.username}</p>
        <h2>Book History</h2>
        <table>
          <tr>
            <th>Book Title</th>
            <th>Date Ordered</th>
            <th>Status</th>
          </tr>
          {orders.map((order, i) => {
            return (
              <tr key={i}>
                <td>{order.title}</td>
                <td>{order.order_date}</td>
                {order.is_fulfilled ? <td><button>Finished</button></td> : <td>On the way!</td>}
              </tr>
            )
          })}
        </table>
    </div>
  )
}

export default UserView
