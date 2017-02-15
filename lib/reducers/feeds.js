import { combineReducers } from 'redux';

const items = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_OBJECTIVES':
      return action.payload.items;
    default:
      return state;
  }
};

export default combineReducers({
  items,
});
