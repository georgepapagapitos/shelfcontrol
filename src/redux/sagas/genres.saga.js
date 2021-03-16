import { takeLatest, put } from "@redux-saga/core/effects";
import axios from 'axios';

function* fetchGenres() {
  try {
    const genres = yield axios.get('/api/genre')
    yield put({ 
      type: 'SET_GENRES', 
      payload: genres.data
    })
  }
  catch(err) {
    console.log('error getting genres', err);
  }
}

function* addGenre(action) {
  try {
    yield axios.post('/api/genre', action.payload);
    yield put({ type: 'FETCH_GENRES' });
  }
  catch(err) {
    console.log('error in addGenre', err);
  }
}

function* genresSaga() {
  yield takeLatest('FETCH_GENRES', fetchGenres);
  yield takeLatest('ADD_NEW_GENRE', addGenre);
}

export default genresSaga;