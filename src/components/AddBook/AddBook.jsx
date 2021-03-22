import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Popup from 'reactjs-popup';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import Swal from 'sweetalert2';
import { Button, TextField, Modal, makeStyles, Paper, Typography, Divider } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
  },
  paper: {
    position: 'absolute',
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function AddBookForm() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const genres = useSelector((store) => store.genres);
  const readingGradeLevels = useSelector((store) => store.readingGradeLevels);
  const books = useSelector((store => store.books));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'FETCH_GENRES'
    });
    dispatch({
      type: 'FETCH_READING_GRADE_LEVELS'
    });
    dispatch({
      type: 'FETCH_BOOKS'
    })
  }, []);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [bookCoverImage, setBookCoverImage] = useState('');
  const [readingGradeLevel, setReadingGradeLevel] = useState('');
  const [infoPage, setInfoPage] = useState('');

  // const handleModal = () => {
  //   handleReset();
  //   setOpen(!open);
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const bookToAdd = {
  //     title,
  //     author,
  //     selectedGenre,
  //     isbn,
  //     description,
  //     bookCoverImage,
  //     readingGradeLevel,
  //     infoPage
  //   };

  //   console.log('booktoAdd', bookToAdd);

  //   let doesBookExist = false;

  //   for(let book of books) {
  //     if(book.isbn === isbn) {
  //       doesBookExist = true;
  //     }
  //   }

  //   if(doesBookExist) {
  //     dispatch({
  //       type: 'INCREASE_QUANTITY',
  //       payload: {isbn: isbn}
  //     })
  //   } else {
  //       dispatch({
  //         type: 'ADD_BOOK',
  //         payload: bookToAdd
  //       })
  //   };

  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Book added to inventory'
  //   })

  //   handleReset();
  // }

  // const handleReset = () => {
  //   setTitle('');
  //   setAuthor('');
  //   setInfoPage('');
  //   setDescription('');
  //   setBookCoverImage('');
  //   setSelectedGenre('');
  //   setIsbn('');
  // }

  // const handleScan = () => {
    // console.log('isbn', isbn);
    // const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    // axios.get(`${url}`)
    //   .then((data) => {
    //     axios.get(`http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`)
    //       .then((image) => {
    //         console.log('image', image.config.url)
    //         const genreToAdd = data.data.items[0].volumeInfo.categories[0]
    //         console.log('scanned genre', genreToAdd);
    //         setTitle(data.data.items[0].volumeInfo.title);
    //         setAuthor(data.data.items[0].volumeInfo.authors[0]);
    //         setInfoPage(data.data.items[0].volumeInfo.previewLink);
    //         setDescription(data.data.items[0].volumeInfo.description);
    //         setBookCoverImage(image.config.url);
            
    //         let doesGenreExist = false;

    //         for(let genre of genres) {
    //           console.log('genre', genre)
    //           if(genre.genre_name === genreToAdd) {
    //             doesGenreExist = true;
    //           }
    //         }
    //         if(doesGenreExist) {
    //           setSelectedGenre(genre.id);
    //         } 
    //         else {
    //           dispatch({
    //           type: 'ADD_NEW_GENRE',
    //           payload: {genreToAdd}
    //         })
    //         setSelectedGenre(genreToAdd);
    //       }
    //     })
    //       .catch(error => {
    //         console.log('error in get image', error)
    //       })
    //     })
    //   .catch(err => {
    //     console.log('error in api request', err);
    //   });
  // }

  // const handleResult = (result) => {
  //   setIsbn(result);
  //   Swal.fire({
  //     title: 'ISBN Found',
  //     input: `${isbn}`,
  //     inputAttributes: {
  //       autocapitalize: 'off'
  //     },
  //     showCancelButton: true,
  //     confirmButtonText: 'Look up',
  //     showLoaderOnConfirm: true,
  //     preConfirm: (isbn) => {
  //       return fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
  //         .then(response => {
  //           if (!response.ok) {
  //             throw new Error(response.statusText)
  //           }
  //           return response.json()
  //         })
  //         .catch(error => {
  //           Swal.showValidationMessage(
  //             `Request failed: ${error}`
  //           )
  //         })
  //     },
  //     allowOutsideClick: () => !Swal.isLoading()
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       setTitle(result.data.items[0].volumeInfo.title);
  //       setAuthor(result.data.items[0].volumeInfo.authors[0]);
  //       setInfoPage(result.data.items[0].volumeInfo.previewLink);
  //       setDescription(result.data.items[0].volumeInfo.description);
  //       Swal.fire({
  //         title: `${title}`,
  //       })
  //     }
  //   })
  // }

  return (
    <div className="container">

    {/* <Modal
      className={classes.modal} 
      aria-labelledby="add-book"
      aria-describedby="add-book"
      open={open}
      onClose={handleModal}>
      <Paper>
        <Typography align="center" variant="h4">Scan ISBN</Typography>
        <Divider />
        <BarcodeScannerComponent
          width={500}
          height={250}
          onUpdate={(err, result) => {
            if(result) {
              console.log('result', result.text)
              setIsbn(result.text);
            }
          }}
        />
        <Typography align="center">Results: {isbn}</Typography>
        <Button color="primary">Confirm</Button>
        <Button color="secondary" onClick={handleModal}>Cancel</Button>
      </Paper>  
    </Modal>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <label htmlFor="genres">
          <select
            name="genres"
            onChange={(event) => setSelectedGenre(event.target.value)}
          >
            <option disabled>Choose a genre</option>
            {genres.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.genre_name}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="readingLevels">
          <select
            name="readingLevels"
            onChange={(event) => setReadingGradeLevel(event.target.value)}
          >
            <option disabled>Choose a reading grade level</option>
            {readingGradeLevels.map((gradeLevel) => {
              return (
                <option key={gradeLevel.id} value={gradeLevel.id}>
                  {gradeLevel.reading_grade_level}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="isbn">
          <input
            placeholder="ISBN"
            value={isbn}
            onChange={(event) => setIsbn(event.target.value)}
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            name="description"
            placeholder="Enter a brief description here..."
            value={description}
            onChange={event => setDescription(event.target.value)}
            rows="4"
            cols="50"
          ></textarea>
        </label>
        <input
          placeholder="Book Cover Image URL"
          value={bookCoverImage}
          onChange={(event) => setBookCoverImage(event.target.value)}
        />
        <img src={bookCoverImage} alt={title} />
        <div>
          <button>Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
      <Popup
        trigger={<Button component="div" variant="contained" color="primary">Add A Book</Button>}
        modal>
        {(close) => (
          <div className="modal">
            <Button color="secondary" className="close" onClick={close}>
              <CloseRoundedIcon />
            </Button>
            <div className="header">Scan the book's barcode</div>
            <div className="scanner">
            <Paper>
              <BarcodeScannerComponent
                width="100%"
                height={250}
                onUpdate={(err, results) => {
                  if(results) {
                    console.log('result', results)
                    setIsbn(results.text);
                    handleScan();
                    close();
                  }
                }}
              />
            </Paper>
              {(title && author) && <p>{title} by {author}</p>}
              <TextField placeholder="Enter ISBN" value={isbn} onChange={(event) => setIsbn(event.target.value)}></TextField>
            </div>
            <div className="actions">
              <Button onClick={() => {
                console.log('confirmed');
                handleReset();
                close();
              }}>
                Confirm
              </Button>
              <Button
                onClick={() => {
                  console.log('cancelled');
                  handleReset();
                  close();
                }}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Popup> */}
    </div>
  );
}

export default AddBookForm;
