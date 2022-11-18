import api from './api';

const eventApi = {
   getAllEvent() {
      return api.call().get('event/all');
   },
};

export default eventApi;
