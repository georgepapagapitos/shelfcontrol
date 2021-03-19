import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import './AddBookForm.css';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import axios from 'axios';
import Swal from 'sweetalert2';


function AddBookForm() {
  const dispatch = useDispatch();

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

  const genres = useSelector((store) => store.genres);
  const readingGradeLevels = useSelector((store) => store.readingGradeLevels);
  const books = useSelector((store => store.books));

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [bookCoverImage, setBookCoverImage] = useState('');
  const [readingGradeLevel, setReadingGradeLevel] = useState('');
  const [infoPage, setInfoPage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const bookToAdd = {
      title,
      author,
      selectedGenre,
      isbn,
      description,
      bookCoverImage,
      readingGradeLevel,
      infoPage
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
  }

  const handleReset = () => {
    setTitle('');
    setAuthor('');
    setInfoPage('');
    setDescription('');
    setBookCoverImage('');
    setSelectedGenre('');
    setIsbn('');
  }

  const handleScan = () => {
    console.log('isbn', isbn);
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    axios
      .get(
        `${url}`
      )
      .then((data) => {
        const genreToAdd = data.data.items[0].volumeInfo.categories[0]
        console.log('scanned genre', genreToAdd);
        setTitle(data.data.items[0].volumeInfo.title);
        setAuthor(data.data.items[0].volumeInfo.authors[0]);
        setInfoPage(data.data.items[0].volumeInfo.previewLink);
        setDescription(data.data.items[0].volumeInfo.description);
        setBookCoverImage(data.data.items[0].volumeInfo.imageLinks.thumbnail);

        let doesGenreExist = false;

        for(let genre of genres) {
          if(genre.genre_name === genreToAdd) {
            doesGenreExist = true;
          }
        }
        if(doesGenreExist) {
            console.log('genre exists');
            setSelectedGenre(genreToAdd);
          } else {
            dispatch({
              type: 'ADD_NEW_GENRE',
              payload: {genreToAdd}
            })
            setSelectedGenre(genreToAdd);
          }
          
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  return (
    <div className="container">
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
          trigger={<button className="button">Scan ISBN</button>}
          modal>
          {(close) => (
            <div className="modal">
              <button type="button" className="close" onClick={close}>
                &times;
              </button>
              <div className="header">Scan the book's barcode</div>
              <div className="content">
                <BarcodeScannerComponent
                  width={500}
                  height={500}
                  onUpdate={(err, result) => {
                    if (result) {
                      setIsbn(result.text);
                    }
                  }}
                />
                <p>ISBN: {isbn}</p>
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    handleScan();
                    close();
                  }}
                >
                  Confirm
                </button>
                <button
                  className="button"
                  onClick={() => {
                    console.log('modal closed ');
                    close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Popup>
    </div>
  );
}

export default AddBookForm;
