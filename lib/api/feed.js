import axios from 'axios';
import config from '../config';

export default {
  search: searchQuery =>
    axios
      .get(`${config.baseUrl}/v3/search/feeds`, {
        query: searchQuery.query,
        count: searchQuery.count,
        locale: searchQuery.locale,
      })
      .then(response => response.data),
};
