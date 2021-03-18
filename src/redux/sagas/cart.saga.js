import { takeLatest, put } from '@redux-saga/core/effects';
import axios from 'axios';

function* addToCart(action) {
  try {
    yield axios.post('/api/cart', action.payload);
  }
  catch(err) {
    console.log('error in addToCart', err);
  }
}

function* fetchCart() {
  try {
    const cart = yield axios.get('/api/cart');
    yield put({ type: 'SET_CART', payload: cart.data});
  }
  catch(err) {
    console.log('error in fetchCart', err);
  }
}

function* removeFromCart(action) {
  try {
    yield axios.delete('/api/cart', action.payload);
    yield put({ type: 'FETCH_CART' });
  }
  catch(err) {
    console.log('error in removeFromCart', err);
  }
}

function* cartSaga() {
  yield takeLatest('ADD_TO_CART', addToCart);
  yield takeLatest('FETCH_CART', fetchCart);
  yield takeLatest('REMOVE_FROM_CART', removeFromCart);
}

export default cartSaga;