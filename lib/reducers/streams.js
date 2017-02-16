import { combineReducers } from 'redux';

const streams = [
  { label: 'Highlight', id: 'journal/hightlight' },
  { label: 'News', id: 'topic/news' },
  { label: 'Songs', id: 'topic/songs' },
  { label: 'events', id: 'topic/events' },
  { label: 'Overseas', id: 'topic/overseas' },
  { label: 'Videos', id: 'topic/videos' },
];

const items = (state = streams, action) => {
  switch (action.type) {
    case 'RECEIVE_STREAMS':
      return action.payload.items;
    default:
      return state;
  }
};

export default combineReducers({
  items,
});
