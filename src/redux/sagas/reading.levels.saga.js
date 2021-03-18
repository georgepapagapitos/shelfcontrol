import { takeLatest, put } from "@redux-saga/core/effects";
import axios from 'axios';

function* fetchReadingGradeLevels() {
  try {
    const readingGradeLevels = yield axios.get('/api/readingLevel')
    yield put({ 
      type: 'SET_READING_GRADE_LEVELS', 
      payload: readingGradeLevels.data
    })
  }
  catch(err) {
    console.log('error getting genres', err);
  }
}

function* readingGradeLevelsSaga() {
  yield takeLatest('FETCH_READING_GRADE_LEVELS', fetchReadingGradeLevels);
}

export default readingGradeLevelsSaga;