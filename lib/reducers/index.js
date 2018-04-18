import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import streams from './streams';
import entries from './entries';

const rootReducer = combineReducers({
  routing: routerReducer,
  streams,
  entries,
});

export default rootReducer;
