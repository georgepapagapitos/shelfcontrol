import { Button, Typography, StepLabel, Step, Stepper, TextField, Paper, Card } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Scanner from "../Scanner/Scanner";
import { makeStyles } from '@material-ui/core/styles';
import AddBookInfo from '../AddBookInfo/AddBookInfo';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '75%',
    margin: 'auto'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function AddBookForm() {

  useEffect(() => {
    dispatch({
      type: 'FETCH_GENRES'
    });
    dispatch({
      type: 'FETCH_BOOKS'
    });
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [bookCoverImage, setBookCoverImage] = useState('');
  const [readingGradeLevel, setReadingGradeLevel] = useState('');
  const [infoPage, setInfoPage] = useState('');
  const genres = useSelector(store => store.genres);
  const books = useSelector(store => store.books);

  const steps = ['Scan ISBN', 'Verify book information'];

  const getStepContent = (step) => {
    switch(step) {
      case 0:
        return <Scanner isbn={isbn} setIsbn={setIsbn}/>;
      case 1:
        return <AddBookInfo bookCoverImage={bookCoverImage} readingGradeLevel={readingGradeLevel} setReadingGradeLevel={setReadingGradeLevel} infoPage={infoPage} setInfoPage={setInfoPage}/>
    }
  }

  const handleNext = () => {

    setActiveStep(1);

    console.log('isbn', isbn);
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    axios.get(`${url}`)
      .then((data) => {
        axios.get(`http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`)
          .then((image) => {
            console.log('image', image.config.url)
            const genreToAdd = data.data.items[0].volumeInfo.categories[0]
            console.log('scanned genre', genreToAdd);
            setTitle(data.data.items[0].volumeInfo.title);
            setAuthor(data.data.items[0].volumeInfo.authors[0]);
            setInfoPage(data.data.items[0].volumeInfo.previewLink);
            setDescription(data.data.items[0].volumeInfo.description);
            setBookCoverImage(image.config.url);

            let doesGenreExist = false;
            let genreId = '';

            for(let genre of genres) {
              console.log('genre', genre)
              if(genre.genre_name === genreToAdd) {
                doesGenreExist = true;
                genreId = genre.id;
              }
            }
              if(doesGenreExist) {
                setSelectedGenre(genreId);
              } 
              else {
                dispatch({
                type: 'ADD_NEW_GENRE',
                payload: {genreToAdd}
              })
              setSelectedGenre(genreToAdd);
            }
        })
        .catch(error => {
          console.log('error in get image', error)
        })
      })
      .catch(err => {
        console.log('error in api request', err);
      });
  }

  const handleBack = () => {
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


  const handleConfirm = (event) => {

    event.preventDefault();

    const bookToAdd = {
      title,
      author,
      selectedGenre,
      description,
      bookCoverImage,
      readingGradeLevel,
      infoPage,
    };

    console.log('booktoAdd', bookToAdd);

    let doesBookExist = false;

    for(let book of books) {
      if(book.isbn === isbn) {
        doesBookExist = true;
      }
    }
    if(doesBookExist) {
      dispatch({
        type: 'INCREASE_QUANTITY',
        payload: {isbn: isbn}
      })
    } else {
        dispatch({
          type: 'ADD_BOOK',
          payload: bookToAdd
        })
    };
    Swal.fire({
      icon: 'success',
      title: 'Book added to inventory'
    })
    handleReset();
    history.push('/books');
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
          <AddBookInfo readingGradeLevel={readingGradeLevel} setReadingGradeLevel={setReadingGradeLevel} infoPage={infoPage} setInfoPage={setInfoPage} bookCoverImage={bookCoverImage} title={title} author={author} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}/>
        </Card>
          <Button onClick={handleBack} className={classes.button}>
            Back
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">Confirm</Button>
        </div>
      ) : (
        <div>
          <Typography className={classes.instructions}>
            {getStepContent(activeStep)}
          </Typography>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
                Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
            {activeStep === steps.length ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddBookForm;