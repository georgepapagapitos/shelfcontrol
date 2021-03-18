import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Typography } from "@material-ui/core";
import Swal from 'sweetalert2';
import moment from 'moment';

import './BookListView.css';

function BookListView() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({
      type: 'FETCH_BOOKS'
    })
  }, [])

  const books = useSelector(store => store.books);
  console.log('books', books)
  const user = useSelector(store => store.user);

  const handleAddToCart = (book) => {
    console.log('in add', book);
    dispatch({
      type: 'ADD_TO_CART',
      payload: { 
        book: book,
        date: moment().format()}
    })
    dispatch({
      type: 'TOGGLE_AVAILABLE',
      payload: book.isbn
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
              <button onClick={() => handleAddToCart(book)}>Add To Cart</button>
              {(user.auth_level === 'ADMIN') && <button onClick={() => handleDelete(book.id)}>Delete</button>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookListView;
