import { FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  image: {
    height: 375,
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2)
  }
}));

function EditBookView() {

  const classes = useStyles();

  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newGenre, setNewGenre] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newReadingGradeLevel, setNewReadingGradeLevel] = useState('');

  useEffect(() => {
    dispatch({
      type: 'FETCH_EDIT_BOOK',
      payload: {bookId: book.id}
    })
    dispatch({
      type: 'FETCH_READING_GRADE_LEVELS'
    });
    dispatch({
      type: 'FETCH_GENRES'
    });
  }, [])

  const book = useSelector(store => store.edit);
  const readingGradeLevels = useSelector(store => store.readingGradeLevels);
  const genres = useSelector(store => store.genres);

  console.log('book', book);

  return ( 
    <center>
    <img className={classes.image} src={book.book_cover_image} alt={book.title}></img>
    <form className={classes.root}>
    <center>
      <TextField label="Title" className={classes.textField} value={newTitle} onChange={(event) => setNewTitle(event.target.value)}></TextField>
      <TextField label="Author" className={classes.textField} value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)}></TextField>
    </center>
    <FormControl className={classes.formControl}>
      <InputLabel>Reading Level</InputLabel>
      <Select
        value={book.reading_grade_level}
        required
        helperText="Select a reading level"
      >
        {readingGradeLevels.map(gradeLevel => {
          return (
            <MenuItem key={gradeLevel.id} value={gradeLevel.id}>{gradeLevel.reading_grade_level}</MenuItem>
          )
        })}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
    <InputLabel>Genre</InputLabel>
    <Select
      labelId="Genre"
      value={book.selectedGenre}
      required
    >
      {genres.map(genre => {
        return (
          <MenuItem key={genre.id} value={genre.id}>{genre.genre_name}</MenuItem>
        )
      })}
    </Select>
  </FormControl>
    </form>
    </center>
  )
}

export default EditBookView
