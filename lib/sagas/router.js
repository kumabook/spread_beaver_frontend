import { fork, put, all } from 'redux-saga/effects';
import { matchPath } from 'react-router-dom';
import { resourceParam as r } from '../utils/resource';

const routes = {
  [`/streams/${r('streamId')}`]: function* fetchStream({ streamId }) {
    yield put({ type: 'search_feeds' });
    yield put({ type: 'fetch_topics' });
    yield put({ type: 'fetch_stream', payload: streamId });
  },
  '/': function* fetch() {
    yield put({ type: 'search_feeds' });
    yield put({ type: 'fetch_topics' });
  },
};

export default function* router({ payload: pathname }) {
  const sagas = [];
  Object.keys(routes).some(path => {
    const match = matchPath(pathname, { path, exact: true });
    if (match) {
      sagas.push(fork(routes[path], match.params));
    }
    return match;
  });
  if (sagas.length === 0) {
    yield put({ type: 'route_not_found' });
  } else {
    yield put({ type: 'route_found' });
    yield all(sagas);
  }
}
