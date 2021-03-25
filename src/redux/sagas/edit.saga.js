import { takeLatest, put } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchEditBook(action) {
  console.log('action',action.payload);
  try {
    const book = yield axios.get(`/api/edit/${action.payload.bookIdToEdit}`);
    yield put({ type: 'SET_EDIT_BOOK', payload: book.data});
  }
  catch(err) {
    console.log('error in setEditBook', err);
  }
}

function* submitEdit(action) {
  try {
    yield axios.put('/api/edit', action.payload);
    yield put({ type: 'FETCH_BOOKS' });
  }
  catch(err) {
    console.log('error in submitEdit', err);
  }
}

function* editSaga() {
  yield takeLatest('FETCH_EDIT_BOOK', fetchEditBook);
  yield takeLatest('SUBMIT_EDIT', submitEdit);
}

export default editSaga;