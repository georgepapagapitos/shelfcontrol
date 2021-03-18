import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

function CartView() {

  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  console.log('cart', cart)

  const dispatch = useDispatch();

  console.log('user', user);

  useEffect(() => {
    console.log('user id to fetch cart', user.id)
    dispatch({
      type: 'FETCH_CART',
      payload: {userId: user.id}
    })
  }, [])

  const handleRemove = (book) => {
    console.log('remove book from cart', book);
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: book
    })
    dispatch({
      type: 'INCREASE_QUANTITY',
      payload: {isbn: book.isbn}
    })
    dispatch({
      type: 'FETCH_CART'
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
      </div>
    </div>
  )
}

export default CartView