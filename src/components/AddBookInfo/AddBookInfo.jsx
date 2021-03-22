import { Button, Paper, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Swal from 'sweetalert2';

function AddBookInfo(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: 'FETCH_READING_GRADE_LEVELS'
    });
    dispatch({
      type: 'FETCH_BOOKS'
    })
  }, [])

  const books = useSelector(store => store.books);
  const readingGradeLevels = useSelector(store => store.readingGradeLevels);

  const handleReset = () => {
    props.setTitle('');
    props.setAuthor('');
    props.setInfoPage('');
    props.setDescription('');
    props.setBookCoverImage('');
    props.setSelectedGenre('');
    props.setReadingGradeLevel('');
    props.setIsbn('');
  }

  const handleConfirm = (event) => {

    event.preventDefault();

    const bookToAdd = {
      title: props.title,
      author: props.author,
      selectedGenre: props.selectedGenre,
      isbn: props.isbn,
      description: props.description,
      bookCoverImage: props.bookCoverImage,
      readingGradeLevel: props.readingGradeLevel,
      infoPage: props.infoPage
    };

    console.log('booktoAdd', bookToAdd);

    let doesBookExist = false;

    for(let book of books) {
      if(book.isbn === props.isbn) {
        doesBookExist = true;
      }
    }

    if(doesBookExist) {
      dispatch({
        type: 'INCREASE_QUANTITY',
        payload: {isbn: props.isbn}
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

  return (
    <div className="container">
      <Paper>
        <img src={props.bookCoverImage}></img>
        <Button onClick={handleConfirm} variant="contained" color="primary">Confirm</Button>
        <form>
          <label htmlFor="readingLevels">
            <select
              name="readingLevels"
              onChange={(event) => props.setReadingGradeLevel(event.currentTarget.value)}
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
        </form>
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="subtitle">{props.author}</Typography>
      </Paper>
    </div>
  )
}

export default AddBookInfo
