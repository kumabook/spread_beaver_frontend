import { combineReducers } from 'redux';

const entries = [
  { id: 'entries1', title: 'title' }
];

const items = (state = entries, action) => {
  switch (action.type) {
    case 'RECEIVE_ENTRIES':
      return action.payload.items;
    default:
      return state;
  }
};

export default combineReducers({
  items,
});
