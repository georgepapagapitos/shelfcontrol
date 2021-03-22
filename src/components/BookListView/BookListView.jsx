import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Typography, IconButton, makeStyles, Button, Divider, CardMedia, Card, CardActionArea, CardContent, CardActions, Grid, TextField, CardHeader, Collapse } from "@material-ui/core";
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import AddBook from '../AddBook/AddBook';
import Swal from 'sweetalert2';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import Popup from 'reactjs-popup';
import './BookListView.css';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  gridContainer: {
    paddingLeft: '40px',
    paddingRight: '40px',
  },
  divider: {
    marginBottom: '40px'
  },
  searchContainer: {
    display: 'flex',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginLeft: '20px',
    paddingLeft: '10px',
    paddingRight: '20px',
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: 'flex-end',
    marginBottom: '5px',
  },
  searchInput: {
    width: '200px',
    margin: "5px",
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))

function BookListView() {

  useEffect(() => {
    dispatch({
      type: 'FETCH_BOOKS'
    });
    dispatch({
      type: 'FETCH_ACTIVE_CART'
    });
  }, [])
  
  const dispatch = useDispatch();
  const classes = useStyles();
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState(false);
  const books = useSelector(store => store.books);
  const user = useSelector(store => store.user);
  const cart = useSelector(store => store.cart);

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

  const displayDetails = (book) => {
    console.log('details', book);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  return (
    <div className='container'>
      <Typography gutterBottom variant="h2" component="div" align="center">
        Available Books
      </Typography>

      <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField className={classes.searchInput} onChange={(event) => {setFilter(event.target.value)}} label="Search Books" variant="standard" />
      </div>

      <Divider className={classes.divider}/>

      {user.auth_level === 'ADMIN' && <AddBook />}
      <Grid container spacing={4} className={classes.gridContainer} justify="center">
        {books.map((book) => {
          if(book.quantity > 0 && book.title.toLowerCase().includes(filter.toLowerCase())) {
            return (
              <Grid key={book.id} item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardHeader
                    title={book.title}
                    subheader={book.author}
                  />
                  <CardMedia
                    className={classes.media}
                    image={book.book_cover_image}
                    title={book.title}
                    onClick={() => displayDetails(book)}
                  />
                  <CardContent>
                    <Typography align="center" variant="body2" noWrap color="textSecondary">
                      {book.reading_grade_level} Reading Level
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {user.auth_level === 'ADMIN' && <Button color="primary" variant="outlined">Edit Book</Button>}
                    {user.auth_level === 'USER' && <Button color="primary" variant="contained" onClick={() => handleAddToCart(book)}>Add To Cart</Button>}
                    {(user.auth_level === 'ADMIN') && <Button color="secondary" variant="outlined" onClick={() => handleDelete(book.id)}>Delete Book</Button>}
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more">
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} time="auto" unmountOnExit>
                    <CardContent>
                    <Typography paragraph>Description:</Typography>
                      <Typography paragraph>
                        {book.description}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>


            /* <div key={book.id} className="card">
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
            </div> */

          )
          }
        })}
      </Grid>
    </div>
  )
}

export default BookListView;
