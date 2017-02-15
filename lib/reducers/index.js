import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import feeds               from './feeds';

const rootReducer = combineReducers({
  routing: routerReducer,
  feeds,
});

export default rootReducer;
