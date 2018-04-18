import { call, put, takeEvery } from 'redux-saga/effects';
import topic from '../api/topic';

export function* fetchTopics() {
  try {
    yield put({ type: 'fetch_topics:start' });
    const topics = yield call(topic.index);
    yield put({ type: 'fetch_topics:success', topics });
  } catch (error) {
    yield put({ type: 'fetch_topics:failure', error });
  }
}

export function* watchFetchTopics() {
  yield takeEvery('fetch_topics', fetchTopics);
}
