import api from './api';

const productApi = {
   getAllProduct: ({page = 1, perPage = 20} = {}) => {
      const url = `/product/all?page=${page}&perPage=${perPage}`;
      return api.call().get(url);
   },

   searchProduct: () => {
      return {};
   },
};

export default productApi;
