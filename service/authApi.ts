import api from './api';

const authApi = {
   login: (loginData) => {
      return api.call().post('/auth/login', loginData);
   },
   register: (registerData) => {
      return api.call().post('/auth/register', registerData);
   },
};

export default authApi;
