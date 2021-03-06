import { takeLatest, put } from '@redux-saga/core/effects';
import axios from 'axios';

function* addToNewCart(action) {
  try {
    yield axios.post('/api/cart/new', action.payload);
    yield put({ type: 'FETCH_ACTIVE_CART' });
  }
  catch(err) {
    console.log('error in addToCart', err);
  }
}

function* addToExistingCart(action) {
  try {
    yield axios.post('/api/cart', action.payload);
    yield put({ type: 'FETCH_ACTIVE_CART' });
  }
  catch(err) {
    console.log('error in addToExistingCart', err);
  }
}

function* fetchActiveCart() {
  try {
    const cart = yield axios.get('/api/cart');
    yield put({ type: 'SET_CART', payload: cart.data});
  }
  catch(err) {
    console.log('error in fetchCart', err);
  }
}

function* removeFromCart(action) {
  console.log('remove action', action.payload);
  try {
    yield axios.delete(`/api/cart/${action.payload.bookId}`);
    yield put({ type: 'FETCH_ACTIVE_CART' });
  }
  catch(err) {
    console.log('error in removeFromCart', err);
  }
}

function* checkout(action) {
  console.log('checkout action', action.payload);
  try {
    yield axios.put('/api/cart', action.payload);
    yield put({ type: 'FETCH_ACTIVE_CART' });
  }
  catch(err) {
    console.log('error in checkout', err);
  }
}

function* cartSaga() {
  yield takeLatest('ADD_TO_NEW_CART', addToNewCart);
  yield takeLatest('ADD_TO_EXISTING_CART', addToExistingCart)
  yield takeLatest('FETCH_ACTIVE_CART', fetchActiveCart);
  yield takeLatest('REMOVE_FROM_CART', removeFromCart);
  yield takeLatest('CHECKOUT', checkout);
}

export default cartSaga;