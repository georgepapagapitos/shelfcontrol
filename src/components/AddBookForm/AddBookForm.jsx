import { Button, Typography, StepLabel, Step, Stepper, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Scanner from "../Scanner/Scanner";
import { makeStyles } from '@material-ui/core/styles';
import AddBookInfo from '../AddBookInfo/AddBookInfo';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

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
      type: 'FETCH_READING_GRADE_LEVELS'
    });
    dispatch({
      type: 'FETCH_BOOKS'
    })
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
  const steps = ['Scan ISBN', 'Verify book information'];
  const genres = useSelector(store => store.genres);

  const checkGenre = () => {

  }


  const getStepContent = (step) => {
    switch(step) {
      case 0:
        return <Scanner isbn={isbn} setIsbn={setIsbn}/>;
      case 1:
        return <AddBookInfo title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} isbn={isbn} setIsbn={setIsbn} description={description} setDescription={setDescription} bookCoverImage={bookCoverImage} setBookCoverImage={setBookCoverImage}
          readingGradeLevel={readingGradeLevel} setReadingGradeLevel={setReadingGradeLevel} infoPage={infoPage}
        />
      default:
        return 'Unknown Step'
    }
  }

  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

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
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const handleReset = () => {
    setActiveStep(0);
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
    
      {activeStep === steps.length ? (
        <div>
          <Typography className={classes.instructions}>
            All steps completed - you&apos;re finished
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
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