import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

export function* notice({ payload: { message, duration } }) {
  yield put({ type: 'flash:notice:show', payload: message });
  yield delay(duration);
  yield put({ type: 'flash:notice:hide' });
}

export function* watchFlash() {
  yield takeEvery('flash:notice', notice);
}
