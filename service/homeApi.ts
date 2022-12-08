import api from './api';

const homeApi = {
   getAllHomeImage() {
      return api.call().get('panel/all');
   },

   createHomeImage(token, formData) {
      return api.callWithToken(token).post('/panel/create', formData);
   },
   updateHomeImage() {},
};

export default homeApi;
