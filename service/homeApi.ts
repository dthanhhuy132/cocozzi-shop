import api from './api';

const homeApi = {
   getAllHomeImage() {
      return api.call().get('panel/all');
   },

   createHomeImage(token, formData) {
      console.log('token trong home Api', token);
      console.log('formData trong home api', formData);

      return api.callWithToken(token).post('/panel/create');
   },
   updateHomeImage() {},
};

export default homeApi;
