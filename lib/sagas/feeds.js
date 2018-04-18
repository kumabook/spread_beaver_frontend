import { call, put, takeEvery } from 'redux-saga/effects';
import feed from '../api/feed';

export function* searchFeeds(query) {
  try {
    yield put({ type: 'search_feeds:start' });
    const feeds = yield call(feed.search, query);
    yield put({ type: 'search_feeds:success', feeds });
  } catch (error) {
    yield put({ type: 'search_feeds:failure', error });
  }
}

export function* watchSearchFeeds() {
  yield takeEvery('search_feeds', searchFeeds, {});
}
