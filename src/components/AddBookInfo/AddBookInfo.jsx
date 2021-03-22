import { IconButton, Link, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function AddBookInfo(props) {

  const dispatch = useDispatch();
  const history = useHistory();

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
    <div className="container">
      <img src={props.bookCoverImage}></img>
        <form>
          <label htmlFor="readingLevels">
            <select
              name="readingLevels"
              onChange={(event) => props.setReadingGradeLevel(event.currentTarget.value)}
            >
              <option disabled defaultValue>Choose a reading grade level</option>
              {readingGradeLevels.map((gradeLevel) => {
                return (
                  <option key={gradeLevel.id} value={gradeLevel.id}>
                    {gradeLevel.reading_grade_level}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="genres">
          <select
            name="genres"
            onChange={(event) => props.setSelectedGenre(event.target.value)}
          >
            <option disabled defaultValue>Choose a genre</option>
            {genres.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.genre_name}
                </option>
              );
            })}
          </select>
        </label>
        </form>
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="subtitle">{props.author}</Typography>
    </div>
  )
}

export default AddBookInfo
