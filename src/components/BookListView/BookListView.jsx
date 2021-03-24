import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Typography, IconButton, makeStyles, Button, Divider, CardMedia, Card, CardActionArea, CardContent, CardActions, Grid, TextField, CardHeader, Collapse, Box } from "@material-ui/core";
import Swal from 'sweetalert2';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';
import './BookListView.css';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { Autocomplete } from '@material-ui/lab';


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  header: {
    display: "block",
    overflow: "hidden"
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
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2'
    },
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
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
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
    dispatch({
      type: 'FETCH_READING_GRADE_LEVELS'
    });
  }, [])
  
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const books = useSelector(store => store.books);
  const user = useSelector(store => store.user);
  const cart = useSelector(store => store.cart);
  const readingGradeLevels = useSelector(store => store.readingGradeLevels);
  const [titleFilter, setTitleFilter] = useState('');
  const [readingLevelInput, setReadingLevelInput] = useState('');
  const [readingLevelFilter, setReadingLevelFilter] = useState('');

  const [expanded, setExpanded] = useState(false);
  const [expandedId, setExpandedId] = useState(-1);

  const [showTitle, setShowTitle] = useState(true);
  const [showTitleId, setShowTitleId] = useState(-1);

  const [editMode, setEditMode] = useState(false);

  const handleEdit = (book) => {
    console.log('editclicked', book);
    setEditMode(true);
    
  }

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

  const handleDelete = (book) => {
    console.log('in delete', book.id);
    Swal.fire({
      title: `Are you sure you want to delete ${book.title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#f50057',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: 'DELETE_BOOK',
          payload: { bookId: book.id }
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
    if(user.auth_level === 'USER') {
      Swal.fire({
        title: book.title,
        text: book.genre_name,
        imageUrl: book.book_cover_image,
        imageAlt: book.title,
        imageHeight: 300,
        imageWidth: 275,
        showCancelButton: true,
        confirmButtonColor: '#3f51b5',
        cancelButtonColor: '#f50057',
        confirmButtonText: 'Add To Cart'
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleAddToCart(book);
          history.push('/cart');
        }
      })
    } else {
      Swal.fire({
        title: book.title,
        text: book.genre_name,
        imageUrl: book.book_cover_image,
        imageWidth: '70%',
        imageHeight: '70%',
        imageAlt: book.title,
      })
    }
  }

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  }

  const handleShowTitle = (i) => {
    setShowTitleId(showTitleId === i ? -1 : i);
  }

  return (
    <div className='container'>
      <Typography className={classes.title} gutterBottom variant="h3" component="div" align="center">
        Available Books
      </Typography>
      <div className={classes.searchContainer}>
        <SearchIcon className={classes.searchIcon} />
        <TextField className={classes.searchInput} onChange={(event) => {setTitleFilter(event.target.value)}} label="Search Books" variant="standard" />
      </div>
      <div className={classes.searchContainer}>
        <SearchIcon className={classes.searchIcon}></SearchIcon>
        <Autocomplete
          value={readingLevelFilter.reading_grade_level ? readingLevelFilter.reading_grade_level : ''}
          options={readingGradeLevels}
          getOptionLabel={(option) => option.reading_grade_level ? option.reading_grade_level : ''}
          onChange={(event, newValue) => newValue ? setReadingLevelFilter(newValue.reading_grade_level) : setReadingLevelFilter('')}
          inputValue={readingLevelInput}
          onInputChange={(event, newInputValue) => {
            {newInputValue ? setReadingLevelInput(newInputValue) : setReadingLevelInput('')};
          }}
          id="reading-grade-levels"
          style={{ width: 300 }}
          renderInput={(params) => <TextField className={classes.searchInput} {...params} label="Reading Level" variant="standard" />}
        />
      </div>
      <Divider className={classes.divider}/>
      <Grid container spacing={4} className={classes.gridContainer} justify="center">
        {books.map((book, i) => {
          if(book.quantity > 0 && book.title.toLowerCase().includes(titleFilter.toLowerCase()) && book.reading_grade_level.includes(readingLevelFilter)) {
            return (

              <Grid key={book.id} item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardHeader
                    className={classes.header}
                    title={<Typography
                            key={book.id}
                            onClick={() => handleShowTitle(i)} 
                            noWrap={showTitleId !== i} 
                            gutterBottom
                            variant="h6" 
                            component="h4"
                          >
                            {book.title}
                          </Typography>}
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
                  <Divider />
                  <CardActions disableSpacing>
                    {user.auth_level === 'ADMIN' && <>
                      <IconButton onClick={() => handleEdit(book)} color="primary" variant="outlined"><EditIcon /></IconButton>
                      <IconButton color="secondary" variant="outlined" onClick={() => handleDelete(book)}><DeleteIcon /></IconButton>
                    </>}
                    {user.auth_level === 'USER' && <Button color="primary" variant="contained" onClick={() => handleAddToCart(book)}>Add To Cart</Button>}
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={() => handleExpandClick(i)}
                      aria-expanded={expandedId === i}
                      aria-label="show more">
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expandedId === i} time="auto" unmountOnExit>
                    <CardContent>
                      <Box fontStyle="italic">
                        <Typography>{book.description}</Typography>
                      </Box>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            )
          }
        })}
      </Grid>
    </div>
  )
}

export default BookListView;
