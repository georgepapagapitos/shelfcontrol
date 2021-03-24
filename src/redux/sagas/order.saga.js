import { takeLatest, put } from '@redux-saga/core/effects';
import axios from 'axios';

function* fetchUserOrders() {
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
    yield put({ type: 'SET_ORDERS', payload: orders.data });
  }
  catch(err) {
    console.log('error in fetchAllOrders', err);
  }
}

function* fetchActiveOrders() {
  try {
    const orders = yield axios.get('/api/order/active');
    yield put({ type: 'SET_ORDERS', payload: orders.data });
  }
  catch(err) {
    console.log('error in fetchActiveOrders', err);
  }
}

function* markOrderSent(action) {
  try {
    yield axios.put('/api/order', {orderId: action.payload.orderId});
    yield put({ type: 'FETCH_ALL_ORDERS' });
  }
  catch(err) {
    console.log('error in markOrderSent', err);
  }
}

function* finishBook(action) {
  try {
    console.log('action', action.payload)
    yield axios.put('/api/order/finish', action.payload);
    yield put({ type: 'FETCH_USER_ORDERS' });
  }
  catch(err) {
    console.log('error in finishBook', err)
  }
}

function* orderSaga() {
  yield takeLatest('FETCH_USER_ORDERS', fetchUserOrders);
  yield takeLatest('FETCH_ALL_ORDERS', fetchAllOrders);
  yield takeLatest('FETCH_ACTIVE_ORDERS', fetchActiveOrders);
  yield takeLatest('MARK_ORDER_SENT', markOrderSent);
  yield takeLatest('FINISH_BOOK', finishBook);
}

export default orderSaga;