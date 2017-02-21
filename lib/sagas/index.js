import {
  call,
  fork,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import feed   from '../api/feed';
import topic  from '../api/topic';
import stream from '../api/stream';

export function* searchFeeds(query) {
  try {
    yield put({ type: 'search_feeds:start' });
    const feeds = yield call(feed.search, query);
    yield put({ type: 'search_feeds:success', feeds });
  } catch (error) {
    yield put({ type: 'search_feeds:failure', error });
  }
}

export function* fetchTopics() {
  try {
    yield put({ type: 'fetch_topics:start' });
    const topics = yield call(topic.index);
    yield put({ type: 'fetch_topics:success', topics });
  } catch (error) {
    yield put({ type: 'fetch_topics:failure', error });
  }
}

export function* fetchStream() {
  try {
    const { entries: { streamId } } = yield select();
    yield put({ type: 'fetch_stream:start' });
    const result = yield call(stream.entries, streamId);
    yield put({ type: 'fetch_stream:success', items: result.items });
  } catch (error) {
    yield put({ type: 'fetch_stream:failure', error });
  }
}

function* watchSearchFeeds() {
  yield takeEvery('search_feeds', searchFeeds, {});
}

function* watchFetchTopics() {
  yield takeEvery('fetch_topics', fetchTopics);
}

function* watchFetchStream() {
  yield takeEvery('fetch_stream', fetchStream);
}

export default function* root() {
  yield [
    fork(watchSearchFeeds),
    fork(watchFetchTopics),
    fork(watchFetchStream),
  ];
  yield [
    call(searchFeeds, {}),
    call(fetchTopics),
    call(fetchStream),
  ];
}

