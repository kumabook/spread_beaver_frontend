import { combineReducers } from 'redux';

const journal = { id: 'journal/hightlight', label: 'Highlight' };

const items = (state = [journal], action) => {
  switch (action.type) {
    case 'search_feeds:success':
      return state;
    case 'fetch_topics:success':
      return [journal].concat(action.topics);
    default:
      return state;
  }
};

export default combineReducers({
  items,
});
