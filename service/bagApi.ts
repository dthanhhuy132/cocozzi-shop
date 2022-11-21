import api from './api';

const bagApi = {
   getUserCart(userId: string, token) {
      if (!token || !userId) {
         return null;
      }

      return api.callWithToken(token).get(`/cart/${userId}`);
   },

   addToCart(userId, cartItem, token) {
      if (!token || !userId) {
         return null;
      }
      return api.callWithToken(token).post('/cart/add');
   },
};

export default bagApi;
