import { takeLatest, put } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchOrders() {
  try {
    const orders = yield axios.get('/api/order');
    console.log('orders in fetchOrders', orders)
    yield put({ type: 'SET_ORDERS', payload: orders.data });
  }
  catch(err) {
    console.log('error in fetchOrders', err);
  }
}

function* orderSaga() {
  yield takeLatest('FETCH_ORDERS', fetchOrders);
}

export default orderSaga;