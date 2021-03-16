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

function* genresSaga() {
  yield takeLatest('FETCH_GENRES', fetchGenres)
}

export default genresSaga;