import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import './AddBookForm.css';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import axios from 'axios';

function AddBookForm() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_GENRES',
    });
  }, []);

  const genres = useSelector((store) => store.genres);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [bookCoverImage, setBookCoverImage] = useState('');
  const [readingGradeLevel, setReadingGradeLevel] = useState('');

  const [scanResults, setScanResults] = useState('');

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
    };
    console.log('booktoAdd', bookToAdd);
    // TODO -- SET UP POST IN SERVER
  };

  const handleScan = () => {
    console.log('isbn', isbn);
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    axios
      .get(
        `${url}`
      )
      .then((data) => {
        console.log(data.data.items);
        setTitle(data.data.items[0].volumeInfo.title);
        setAuthor(data.data.items[0].volumeInfo.authors[0]);
        setDescription(data.data.items[0].volumeInfo.description);
        setBookCoverImage(data.data.items[0].volumeInfo.imageLinks.thumbnail);
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
        <input
          placeholder="Reading Grade Level"
          value={readingGradeLevel}
          onChange={(event) => setReadingGradeLevel(event.target.value)}
        />
        <div>
          <button>Submit</button>
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
