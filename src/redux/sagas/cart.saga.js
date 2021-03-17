import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addToCart(action) {
  try {
    yield axios.post('/api/cart', action.payload);
    yield put({ type: 'FETCH_CART' });
  }
  catch(err) {
    console.log('error in addToCart', err);
  }
}

function* fetchCart() {
  try {
    const cart = yield axios.get('/api/cart');
    console.log('in fetchCart', cart);
    yield put({ type: 'SET_CART', payload: cart.data });
  }
  catch(err) {
    console.log('fetch cart error', err);
  }
}

function* cartSaga() {
  yield takeLatest('ADD_TO_CART', addToCart);
  yield takeLatest('FETCH_CART', fetchCart);
}

export default cartSaga;