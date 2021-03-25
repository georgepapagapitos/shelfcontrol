import { takeLatest, put } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchEditBook(action) {
  try {
    const book = yield axios.get(`/api/edit/${action.payload.id}`);
    yield put({ type: 'SET_BOOK', payload: book.data});
  }
  catch(err) {
    console.log('error in setEditBook', err);
  }
}

function* editSaga() {
  yield takeLatest('FETCH_EDIT_BOOK', fetchEditBook);
}

export default editSaga;