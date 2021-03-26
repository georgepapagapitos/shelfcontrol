import { Button, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, TextareaAutosize, TextField } from "@material-ui/core";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import Swal from "sweetalert2";

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

  const history = useHistory();
  const bookIdToEdit = useParams().id;
  console.log('id to edit', bookIdToEdit);
  const classes = useStyles();
  const dispatch = useDispatch();
  const readingGradeLevels = useSelector(store => store.readingGradeLevels);
  const genres = useSelector(store => store.genres);
  const book = useSelector(store => store.edit);

  useEffect(() => {
    dispatch({
      type: 'FETCH_EDIT_BOOK',
      payload: {bookIdToEdit: bookIdToEdit}
    })
    dispatch({
      type: 'FETCH_READING_GRADE_LEVELS'
    });
    dispatch({
      type: 'FETCH_GENRES'
    });
  }, [])

  const handleChange = (key, event) => {
    dispatch({
      type: 'EDIT_ON_CHANGE',
      payload: {property: key, value: event.target.value}
    })
  }

  const handleUpdate = () => {
    dispatch({
      type: 'SUBMIT_EDIT',
      payload: book
    })
    Swal.fire({
      icon: 'success',
      title: 'Book Updated'
    })
    history.push('/books');
  }

  return (
    <Paper>
      <center>
      <img className={classes.image} src={book.book_cover_image} alt={book.title}></img>
        <form className={classes.root}>
        <center>
          <TextField label="Title" className={classes.textField} value={book.title || ""} onChange={(event) => handleChange('title', event)}>{book.title}</TextField>
          <TextField label="Author" className={classes.textField} value={book.author || ""} onChange={(event) => handleChange('author', event)}>{book.author}</TextField>
        </center>
        <FormControl className={classes.formControl}>
          <InputLabel>Reading Level</InputLabel>
          <Select
            value={book.readingGradeLevel || ""}
            labelId="Reading Level"
            required
            helperText="Select a reading level"
            onChange={(event) => handleChange('readingGradeLevel', event)}
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
          value={book.genre || ""}
          labelId="Genre"
          required
          onChange={(event) => handleChange('genre', event)}
        >
          {genres.map(genre => {
            return (
              <MenuItem key={genre.id} value={genre.id}>{genre.genre_name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <TextareaAutosize
        rowsMax={4}
        aria-label="maximum height"
        placeholder="Enter book description..."
        value={book.description || ""}
        onChange={(event) => handleChange('description', event)}
    />
        <Button type="button" color="secondary" variant="contained" onClick={history.goBack}>Cancel</Button>
        <Button type="button" color="primary" variant="contained" onClick={handleUpdate}>Update</Button>
        </form>
      </center>
    </Paper>
  )
}

export default EditBookView
