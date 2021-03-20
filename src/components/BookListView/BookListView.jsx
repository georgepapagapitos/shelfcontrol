import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Typography, Button } from "@material-ui/core";
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import AddBookForm from '../AddBookForm/AddBookForm';
import Swal from 'sweetalert2';

import './BookListView.css';

function BookListView() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_BOOKS'
    });
    dispatch({
      type: 'FETCH_USER_ORDERS'
    })
    dispatch({
      type: 'FETCH_ACTIVE_CART'
    });
  }, [])

  const books = useSelector(store => store.books);
  const user = useSelector(store => store.user);
  const orders = useSelector(store => store.orders);
  const cart = useSelector(store => store.cart);
  console.log('orders', orders);
  console.log('cart', cart);

  const handleAddToCart = (book) => {
    if(orders.length) {
      console.log('active order');
      dispatch({
        type: 'ADD_TO_EXISTING_CART',
        payload: {
          activeOrderId: orders[0].id,
          book: book
        }
      })
    } else {
      console.log('creating new order')
      dispatch({
        type: 'ADD_TO_NEW_CART',
        payload: {
          book: book
        }
      })
    }
    dispatch({
      type: 'DECREASE_QUANTITY',
      payload: {bookId: book.id}
    })
    Swal.fire({
      icon: 'success',
      title: 'Added Book To Cart',
      text: `${book.title}`,
    })
  }

  const handleDelete = (bookId) => {
    console.log('in delete', bookId);
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: 'DELETE_BOOK',
          payload: { bookId }
        })
        Swal.fire(
          'Deleted!',
          'Book has been deleted.',
          'success'
        )
      }
    })
    
  }

  return (
    <div className='container'>
      <Typography variant="h2" component="div" align="center">
        Available Books
      </Typography>
      {user.auth_level === 'ADMIN' && <AddBookForm />}
      <div className="books">
        {books.map(book => {
          if(book.quantity > 0) {
            return (
            <div key={book.id} className="card">
              <Typography align="center" variant="h6">
                {book.title}
              </Typography>
              <Typography align="center" variant="subtitle2">
                by {book.author}
              </Typography>
              <hr/>
              <a target="_blank" href={book.info_page}>
                <img className="book-cover" src={book.book_cover_image} alt={book.title} />
              </a>
              <Typography align="center">Recommended Reading Level: {book.reading_grade_level}</Typography>
              <hr/>
              {(user.auth_level === 'ADMIN') && <button onClick={() => handleDelete(book.id)}>Delete</button>}
              {(user.auth_level === 'USER') && <Button component="div" variant="contained" color="primary" onClick={() => handleAddToCart(book)}><AddShoppingCartOutlinedIcon/></Button>}
            </div>
          )
          }
        })}
      </div>
    </div>
  )
}

export default BookListView;
