import axios  from 'axios';
import config from '../config';

export default {
  index: () => axios.get(`${config.baseUrl}/v3/topics`)
    .then(response => response.data),
};
