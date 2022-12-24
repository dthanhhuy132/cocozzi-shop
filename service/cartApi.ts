import api from './api';

const cartApi = {
   addToCart(token, cartData) {
      return api.callWithToken(token).get('cart/add', cartData);
   },

   removeCartItem(token, cartRemoveData) {
      return api.callWithToken(token).delete(`/cart/delete/`, cartRemoveData);
   },

   getCartByUserId(token, userId) {
      return api.callWithToken(token).get(`/cart/${userId}`);
   },
};

export default cartApi;
