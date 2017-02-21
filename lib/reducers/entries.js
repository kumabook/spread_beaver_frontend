import { combineReducers } from 'redux';

const entries = [
  { id: 'entries1', title: 'title' },
];

const streamId = (state = null, action) => {
  switch (action.type) {
    case 'fetch_stream':
      return action.streamId;
    default:
      return state;
  }
};

const items = (state = entries, action) => {
  switch (action.type) {
    case 'fetch_stream:start':
      return [];
    case 'fetch_stream:success':
      return action.items;
    default:
      return state;
  }
};

export default combineReducers({
  streamId,
  items,
});
