import { Button, Typography, StepLabel, Step, Stepper, TextField, Paper, Card } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Scanner from "../Scanner/Scanner";
import { makeStyles } from '@material-ui/core/styles';
import AddBookInfo from '../AddBookInfo/AddBookInfo';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Swal from 'sweetalert2';


// Declare useStyles for styling the component
const useStyles = makeStyles((theme) => ({
  root: {
    width: '75%',
    margin: 'auto'
  },
  button: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function AddBookForm() {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    dispatch({
      type: 'FETCH_GENRES'
    });
    dispatch({
      type: 'FETCH_BOOKS'
    });
  }, []);

  const genres = useSelector(store => store.genres);
  const books = useSelector(store => store.books);

  // Active step determines what to render based on your location in the Stepper
  const [activeStep, setActiveStep] = useState(0);

  // Initial state for the form's inputs
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [bookCoverImage, setBookCoverImage] = useState('');
  const [readingGradeLevel, setReadingGradeLevel] = useState('');
  const [infoPage, setInfoPage] = useState('');

  // This is used for the header of the stepper
  const steps = ['Scan ISBN', 'Verify book information'];

  // Function that determines what to display based on the user's
  // position in the stepper
  const getStepContent = (step) => {
    switch(step) {
      case 0:
        return <Scanner isbn={isbn} setIsbn={setIsbn}/>;
      case 1:
        return <AddBookInfo bookCoverImage={bookCoverImage} readingGradeLevel={readingGradeLevel} setReadingGradeLevel={setReadingGradeLevel} infoPage={infoPage} setInfoPage={setInfoPage}/>
    }
  }

  async function handleNext() {
    setActiveStep(1);
    await getImage();
    await getData();
  }

  const getImage = () => {
    axios.get(`http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`)
      .then(image => {
        setBookCoverImage(image.config.url);
      })
      .catch(err => {
        console.log('error in getImage', err);
      })
  }

  const getData = () => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .then(data => {
        const genreToAdd = data.data.items[0].volumeInfo.categories[0]
        setTitle(data.data.items[0].volumeInfo.title);
        setAuthor(data.data.items[0].volumeInfo.authors[0]);
        setInfoPage(data.data.items[0].volumeInfo.previewLink);
        setDescription(data.data.items[0].volumeInfo.description);
        // Determine if the genre already exists in the DB
        let doesGenreExist = false;
        let genreId = '';
        // Iterate through existing genres
        for(let genre of genres) {
          if(genre.genre_name === genreToAdd) {
            doesGenreExist = true;
            genreId = genre.id;
          }
        }
        if(doesGenreExist) {
          setSelectedGenre(genreId);
        }
        // If the genre does not exist, add it to the DB 
        // then set it as the selected genre
        else {
          dispatch({
            type: 'ADD_NEW_GENRE',
            payload: {genreToAdd}
          })
          setSelectedGenre(genreToAdd);
        }
      })
      .catch(err => {
        console.log('error in getData', err);
      })
    }
  

    // Make request to google API via the book's ISBN
    await axios.get(`http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`)
    .then((image) => {
      // Set the book's information using data sent back from API
      setBookCoverImage(image.config.url);
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .then((data) => {
        const genreToAdd = data.data.items[0].volumeInfo.categories[0]
        setTitle(data.data.items[0].volumeInfo.title);
        setAuthor(data.data.items[0].volumeInfo.authors[0]);
        setInfoPage(data.data.items[0].volumeInfo.previewLink);
        setDescription(data.data.items[0].volumeInfo.description);
        // Determine if the genre already exists in the DB
        let doesGenreExist = false;
        let genreId = '';
        // Iterate through existing genres
        for(let genre of genres) {
          if(genre.genre_name === genreToAdd) {
            doesGenreExist = true;
            genreId = genre.id;
          }
        }
        if(doesGenreExist) {
          setSelectedGenre(genreId);
        }
        // If the genre does not exist, add it to the DB 
        // then set it as the selected genre
        else {
          dispatch({
            type: 'ADD_NEW_GENRE',
            payload: {genreToAdd}
          })
          setSelectedGenre(genreToAdd);
                    }
        // Make another request to openLibrary API for more consistent cover images

      })
      .catch(err => {
        console.log('error in api request', err);
      });
    })
    .catch(error => {
      console.log('error in get image', error)
    })

  }

  const handleBack = () => {
    handleReset();
    setActiveStep(0);
  }

  const handleReset = () => {
    setTitle('');
    setAuthor('');
    setInfoPage('');
    setDescription('');
    setBookCoverImage('');
    setSelectedGenre('');
    setReadingGradeLevel('');
    setIsbn('');
  }

  // Function that confirms the information 
  // after the user enters a book's ISBN
  const handleConfirm = (event) => {
    if(readingGradeLevel) {
      event.preventDefault();
      const bookToAdd = {
        title,
        author,
        isbn,
        selectedGenre,
        description,
        bookCoverImage,
        readingGradeLevel,
        infoPage,
      };
  
      // Check if there is already a matching
      // ISBN in the database
      let doesBookExist = false;
      for(let book of books) {
        if(book.isbn === isbn) {
          doesBookExist = true;
        }
      }
      // If there is a match, increase the book's quantity by 1
      if(doesBookExist) {
        dispatch({
          type: 'INCREASE_QUANTITY',
          payload: {isbn: isbn}
        })
        // If there is not a matching ISBN, add the new book to the DB
      } else {
          dispatch({
            type: 'ADD_BOOK',
            payload: bookToAdd
          })
      };
      // Alert on success
      Swal.fire({
        icon: 'success',
        title: 'Added book to inventory'
      })
      handleReset();
      history.push('/books');
    } else {
      // Alert that triggers if no reading level is selected
      Swal.fire({
        icon: 'error',
        text: 'Select a reading level',
        confirmButtonColor: '#3f51b5',
      })
    }
  }

  return(
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    
      {activeStep === 1 ? (
        <div>
        <Card>
          <AddBookInfo readingGradeLevel={readingGradeLevel} setReadingGradeLevel={setReadingGradeLevel} infoPage={infoPage} setInfoPage={setInfoPage} bookCoverImage={bookCoverImage} setBookCoverImage={setBookCoverImage} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}/>
        </Card>
          <Button onClick={handleBack} className={classes.button}>Back</Button>
          <Button onClick={handleConfirm} type="button" variant="contained" color="primary">Confirm</Button>
        </div>
      ) : (
        <div>
          <Typography className={classes.instructions}>
            {getStepContent(activeStep)}
          </Typography>
          <div>
          <center>
            <Button
              onClick={history.goBack}
              className={classes.button}
              color="secondary"
            >
                Cancel
            </Button>
            <Button
              disabled={isbn.length > 9 ? false : true}
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
            {activeStep === steps.length ? 'Finish' : 'Next'}
            </Button>
            </center>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddBookForm;