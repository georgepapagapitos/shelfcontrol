import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment';
import { useHistory } from "react-router";
import Swal from 'sweetalert2';

function CartView() {

  const cart = useSelector((store) => store.cart);

  const dispatch = useDispatch();
  const history = useHistory();

  const date = moment().format('L');

  useEffect(() => {
    dispatch({
      type: 'FETCH_CART'
    })
  }, [])

  const handleRemove = (book) => {
    console.log('remove book from cart', book);
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {bookId: book.id}
    })
    dispatch({
      type: 'INCREASE_QUANTITY',
      payload: {isbn: book.isbn}
    })
    dispatch({
      type: 'FETCH_CART'
    })
  }

  const handleCheckout = (cart) => {
    console.log('in handlecheckout', cart, date);
    Swal.fire({
      title: 'Are you ready to checkout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, checkout!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: 'CHECKOUT',
          payload: {
            cart: cart,
            date: date
          }
        })
        Swal.fire(
          'Order complete!',
          'Your books will on their way soon!.',
          'success'
        )
        history.push('/user');
      }
    })
  }

  return (
    <div className="container">
      <h2>Current Cart:</h2>
      <div>
        <ul>
          {cart.map(book => {
            return (
              <li key={book.id}>
                {book.title} by {book.author}
                <button type="button" onClick={() => handleRemove(book)}>Remove</button>
              </li>
            )
          })}
        </ul>
        <button type="button" onClick={() => handleCheckout(cart)}>Checkout</button>
      </div>
    </div>
  )
}

export default CartView