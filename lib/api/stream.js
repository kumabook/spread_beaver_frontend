import axios  from 'axios';
import config from '../config';

export default {
  entries: (id, params) => axios.get(`${config.baseUrl}/v3/streams/${encodeURIComponent(id)}/contents`, {
    params,
  }).then(response => response.data),
};
