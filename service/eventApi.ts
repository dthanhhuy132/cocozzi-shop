import api from './api';

const eventApi = {
   getAllEvent() {
      return api.call().get('event/all');
   },

   createEvent(token, formData) {
      return api.callWithToken(token).post('/event/create', formData);
   },
};

export default eventApi;
