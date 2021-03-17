import { takeLatest, put } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchBooks() {
  try {
    const books = yield axios.get('/api/book');
    console.log('get all books:', books.data)
    yield put({ type: 'SET_BOOKS', payload: books.data});
  } catch(err) {
    console.log('error in fetchBooks', err);
  }
}

function* addBook(action) {
  try {
    yield axios.post('/api/book', action.payload);
    yield put({ type: 'FETCH_BOOKS' });
  }
  catch(err) {
    console.log('error in addBook', err);
  }
}

function* booksSaga() {
  yield takeLatest('FETCH_BOOKS', fetchBooks);
  yield takeLatest('ADD_BOOK', addBook);
}

export default booksSaga;