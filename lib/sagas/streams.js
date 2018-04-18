import { call, put, select, takeEvery } from 'redux-saga/effects';
import moment from 'moment';
import stream from '../api/stream';

export function* fetchStream() {
  try {
    const {
      entries: { streamId },
    } = yield select();
    yield put({ type: 'fetch_stream:start' });
    const result = yield call(stream.entries, streamId, {
      newerThan: moment()
        .subtract(3, 'years')
        .valueOf(),
    });
    yield put({ type: 'fetch_stream:success', items: result.items });
  } catch (error) {
    yield put({ type: 'fetch_stream:failure', error });
  }
}

export function* watchFetchStream() {
  yield takeEvery('fetch_stream', fetchStream);
}
