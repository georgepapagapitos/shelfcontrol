import { useDispatch, useSelector } from "react-redux"

function CartView() {

  const dispatch = useDispatch();
  const currentCart = useSelector((store) => store.cart);

  const handleRemove = (book) => {
    console.log('remove book from cart', book);
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: book
    })
    dispatch({
      type: 'TOGGLE_AVAILABLE',
      payload: book.id
    })
  }

  return (
    <div className="container">
      <h2>Current Cart:</h2>
      <div>
        <ul>
          {currentCart.map(item => {
            return (
              <li key={item.book.id}>
                {item.book.title} by {item.book.author}
                <button type="button" onClick={() => handleRemove(item.book)}>Remove</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CartView
