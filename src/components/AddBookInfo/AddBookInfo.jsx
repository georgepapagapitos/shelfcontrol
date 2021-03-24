import { TextField, Typography, FormControl, Select, MenuItem, InputLabel, makeStyles } from "@material-ui/core";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

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

function AddBookInfo(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  let isValid = false;
  if(props.readingGradeLevel) {
    isValid = true;
  }


  useEffect(() => {
    dispatch({
      type: 'FETCH_GENRES'
    });
    dispatch({
      type: 'FETCH_READING_GRADE_LEVELS'
    });
  }, [])

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
        <FormControl className={classes.formControl}>
          <InputLabel>Reading Level</InputLabel>
          <Select
            value={props.readingGradeLevel}
            onChange={(event) => props.setReadingGradeLevel(event.target.value)}
            required
            error={!isValid}
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
          labelId="Genre"
          value={props.selectedGenre}
          onChange={(event) => props.setSelectedGenre(event.target.value)}
          required
        >
          {genres.map(genre => {
            return (
              <MenuItem value={genre.id}>{genre.genre_name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
        </form>
    </div>
  )
}

export default AddBookInfo
