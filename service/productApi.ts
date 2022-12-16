import api from './api';

const productApi = {
   getAllProduct: ({page = 1, perPage = 20} = {}) => {
      const url = `/product/all?page=${page}&perPage=${perPage}`;
      return api.call().get(url);
   },

   getAllProductByName: () => {
      return api.call().get('/product/allByName');
   },

   searchProduct: () => {
      return {};
   },

   createNewProduct: (token, formData) => {
      return api.callWithToken(token).post('/product/create', formData);
   },

   deleteProduct: (token, productId) => {
      return api.callWithToken(token).delete(`/product/${productId}`);
   },
};

export default productApi;
