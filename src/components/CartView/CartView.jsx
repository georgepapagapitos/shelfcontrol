import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

function CartView() {

  const cart = useSelector((store) => store.cart);

  const dispatch = useDispatch();

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
    console.log('in handlecheckout', cart);
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