import { combineReducers } from 'redux';

const all     = { id: 'tag/global.latest', label: 'top' };
const journal = { id: 'journal/highlight', label: 'highlight' };

const items = (state = [all, journal], action) => {
  switch (action.type) {
    case 'search_feeds:success':
      return state;
    case 'fetch_topics:success':
      return [
        all,
        journal,
      ].concat(action.topics.filter(t => t.label !== journal.label));
    default:
      return state;
  }
};

export default combineReducers({
  items,
});
