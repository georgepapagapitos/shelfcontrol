import { takeLatest, put } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchOrders() {
  try {
    const orders = yield axios.get('/api/order');
    yield put({ type: 'SET_ORDERS', payload: orders.data });
  }
  catch(err) {
    console.log('error in fetchOrders', err);
  }
}

function* fetchAllOrders() {
  try {
    const orders = yield axios.get('/api/order/all');
    yield put({ type: 'SET_ORDERS', payload: orders.data});
  }
  catch(err) {
    console.log('error in fetchAllOrders', err);
  }
}

function* markOrderSent(action) {
  try {
    yield axios.put('/api/order', {orderId: action.payload.orderId});
    yield put({ type: 'FETCH_ORDERS' });
  }
  catch(err) {
    console.log('error in markOrderSent', err);
  }
}

function* orderSaga() {
  yield takeLatest('FETCH_ORDERS', fetchOrders);
  yield takeLatest('FETCH_ALL_ORDERS', fetchAllOrders);
  yield takeLatest('MARK_ORDER_SENT', markOrderSent);
}

export default orderSaga;