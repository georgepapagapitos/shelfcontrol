import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

function CartView() {

  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  console.log('cart', cart)

  const dispatch = useDispatch();

  console.log('user', user);

  useEffect(() => {
    dispatch({
      type: 'FETCH_CART',
      payload: user.id
    })
  }, [])

  const handleRemove = (book) => {
    console.log('remove book from cart', book);
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: user.id
    })
    dispatch({
      type: 'INCREASE_QUANTITY',
      payload: {isbn: book.isbn}
    })
    dispatch({
      type: 'FETCH CART',
      payload: user.id
    })
  }

  return (
    <div className="container">
      <h2>Current Cart:</h2>
      <div>
        <ul>
          {/* {cart.map(book => {
            return (
              <li key={book.id}>
                {book.title} by {book.author}
                <button type="button" onClick={() => handleRemove(book)}>Remove</button>
              </li>
            )
          })} */}
        </ul>
      </div>
    </div>
  )
}

export default CartView