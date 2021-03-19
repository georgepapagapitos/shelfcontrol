import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Typography } from "@material-ui/core";
import AddBookForm from '../AddBookForm/AddBookForm';
import Swal from 'sweetalert2';
import moment from 'moment';

import './BookListView.css';

function BookListView() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({
      type: 'FETCH_BOOKS'
    });
    dispatch({
      type: 'FETCH_ORDERS'
    })
  }, [])

  const books = useSelector(store => store.books);
  const user = useSelector(store => store.user);
  const orders = useSelector(store => store.orders);
  console.log('orders in booklist view', orders)

  let activeOrder = {
    id: '',
    isActive: false
  };

  for(let order of orders) {
    if(order.is_active === true) {
      activeOrder = {
        id: order.id,
        isActive: true
      }
    }
  }

  const handleAddToCart = (book) => {
    if(activeOrder.isActive) {
      console.log('active order');
      dispatch({
        type: 'ADD_TO_EXISTING_CART',
        payload: {
          activeOrderId: activeOrder.id,
          book: book,
          date: moment().format()
        }
      })
    } else {
      console.log('creating new order')
      dispatch({
        type: 'ADD_TO_NEW_CART',
        payload: {
          book: book,
          date: moment().format()
        }
      })
    }

    dispatch({
      type: 'DECREASE_QUANTITY',
      payload: {isbn: book.isbn}
    })

    Swal.fire({
      icon: 'success',
      title: 'Added Book To Cart',
      text: `${book.title}`
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
          return (
            <div key={book.id} className="card">
              <h3>{book.title}</h3>
              <hr/>
              <a target="_blank" href={book.info_page}>
                <img className="book-cover" src={book.book_cover_image} alt={book.title} />
              </a>
              <p>Recommended Reading Level: {book.reading_grade_level}</p>
              <hr/>
              {(user.auth_level === 'ADMIN') && <button onClick={() => handleDelete(book.id)}>Delete</button>}
              {(user.auth_level === 'USER') && <button onClick={() => handleAddToCart(book)}>Add To Cart</button>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookListView;
