import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Typography } from "@material-ui/core";

import './BookListView.css';

function BookListView() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({
      type: 'FETCH_BOOKS'
    })
  }, [])

  const books = useSelector(store => store.books);

  const handleAdd = () => {
    console.log('in add');
  }

  const handleDelete = (bookId) => {
    console.log('in delete', bookId);
    dispatch({
      type: 'DELETE_BOOK',
      payload: { bookId }
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
                <button onClick={handleAdd}>Add To Cart</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookListView;
