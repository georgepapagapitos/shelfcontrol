import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Typography, IconButton, makeStyles, Popper, Button, Divider } from "@material-ui/core";
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import AddBook from '../AddBook/AddBook';
import Swal from 'sweetalert2';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import Popup from 'reactjs-popup';
import './BookListView.css';


import './BookListView.css';

function BookListView() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_BOOKS'
    });
    dispatch({
      type: 'FETCH_ACTIVE_CART'
    });
  }, [])

  const books = useSelector(store => store.books);
  const user = useSelector(store => store.user);
  const cart = useSelector(store => store.cart);
  console.log('cart', cart);

  const handleAddToCart = (book) => {
    if(cart.length) {
      console.log('active order');
      dispatch({
        type: 'ADD_TO_EXISTING_CART',
        payload: {
          activeOrderId: cart[0].order_id,
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
      {user.auth_level === 'ADMIN' && <AddBook />}
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
              <Divider/>
              <img className="book-cover" src={book.book_cover_image} alt={book.title} />
              <Typography align="center">Recommended Reading Level: {book.reading_grade_level}</Typography>
              <Divider/>
              <Popup trigger={
              <IconButton type="button" aria-label="info">
                <InfoIcon color="primary"/>
              </IconButton>} modal>
              <div className="popup-content">
                <h3>{book.title} by {book.author}</h3>
                <h4>Genre: {book.genre_name}</h4>
                <Divider/>
                <h3>Description:</h3>
                <div>
                  <Typography>{book.description}</Typography>
                </div>
                <h3>{book.reading_grade_level} Reading Level</h3>
                {user.auth_level === 'ADMIN' && <Button color="primary" variant="outlined">Edit Book</Button>}
                {user.auth_level === 'USER' && <Button color="primary" variant="contained" onClick={() => handleAddToCart(book)}>Add To Cart</Button>}
              </div>
              </Popup>
              {(user.auth_level === 'ADMIN') && <IconButton onClick={() => handleDelete(book.id)}><DeleteIcon color="secondary"/></IconButton>}
              {(user.auth_level === 'USER') && <IconButton className="add-btn" size="medium" onClick={() => handleAddToCart(book)}><AddShoppingCartOutlinedIcon color="primary" /></IconButton>}
            </div>
          )
          }
        })}
      </div>
    </div>
  )
}

export default BookListView;
