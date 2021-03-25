import { TextField, Typography, FormControl, Select, MenuItem, InputLabel, makeStyles } from "@material-ui/core";
import { fade } from '@material-ui/core/styles';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

// Declare useStyles for styling the component
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
    marginTop: theme.spacing(2)
  },
  searchContainer: {
    display: 'flex',
    backgroundColor: fade(theme.palette.common.white, 0.15),
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
  }
}));

function AddBookInfo(props) {

  const dispatch = useDispatch();
  const classes = useStyles();

  // Declare variables that will be used to conditionally render the error
  // display within the reading level and genre inputs if the inputs are empty
  let isReadingLevelValid = false;
  if(props.readingGradeLevel) {
    isReadingLevelValid = true;
  }
  let isGenreValid = false;
  if(props.selectedGenre) {
    isGenreValid = true;
  }

  useEffect(() => {
    dispatch({
      type: 'FETCH_GENRES'
    });
    dispatch({
      type: 'FETCH_READING_GRADE_LEVELS'
    });
  }, [])

  // Grab reading grade levels and genres from the store to use in the select inputs
  const readingGradeLevels = useSelector(store => store.readingGradeLevels);
  const genres = useSelector(store => store.genres);
 
  return (
    <div>
      <img className={classes.image} src={props.bookCoverImage} alt={props.title}></img>
        <form className={classes.root}>
        <center>
          <TextField label="Title" className={classes.textField} value={props.title} onChange={(event) => props.setTitle(event.target.value)}>{props.title}</TextField>
          <TextField label="Author" className={classes.textField} value={props.author} onChange={(event) => props.setAuthor(event.target.value)}>{props.author}</TextField>
        </center>
        <div className={classes.searchContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel>Reading Level</InputLabel>
          <Select
            value={props.readingGradeLevel}
            onChange={(event) => props.setReadingGradeLevel(event.target.value)}
            required
            error={!isReadingLevelValid}
            helperText="Select a reading level"
          >
            {readingGradeLevels.map(gradeLevel => {
              return (
                <MenuItem value={gradeLevel.id}>{gradeLevel.reading_grade_level}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={props.selectedGenre}
          onChange={(event) => props.setSelectedGenre(event.target.value)}
          required
          error={!isGenreValid}
          helperText="Select a genre"
        >
          {genres.map(genre => {
            return (
              <MenuItem value={genre.id}>{genre.genre_name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
      </div>
        </form>
    </div>
  )
}

export default AddBookInfo
