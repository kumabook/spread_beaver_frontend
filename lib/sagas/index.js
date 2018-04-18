import {
  call,
  fork,
  take,
  takeLatest,
  takeEvery,
  all,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { watchChangeLocale, watchLocaleChanged } from './locale';
import router from './router';
import isBrowser from '../utils/is-browser';
import { watchFlash } from './flash';
import { watchFetchStream } from './streams';
import { watchSearchFeeds } from './feeds';
import { watchFetchTopics } from './topics';

function* locationChanged({ payload }) {
  const { pathname } = payload;
  yield call(router, { payload: pathname });
}

export function* watchUrl() {
  yield takeEvery('url', router);
}

export function* watchLocationChange() {
  yield take(LOCATION_CHANGE); // skip first action
  yield takeLatest(LOCATION_CHANGE, locationChanged);
}

export default function* root(i18n, history) {
  const sagas = [
    fork(watchChangeLocale, i18n),
    fork(watchSearchFeeds),
    fork(watchFetchTopics, i18n, history),
    fork(watchFetchStream),
  ];
  if (isBrowser()) {
    sagas.push(fork(watchLocaleChanged));
    sagas.push(fork(watchLocationChange));
    sagas.push(fork(watchFlash));
  } else {
    sagas.push(fork(watchUrl));
  }
  yield all(sagas);
}
