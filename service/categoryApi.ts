import api from './api';

const categoryApi = {
   getAllCategory() {
      const url = '/category/all';
      return api.call().get(url);
   },

   getCategoryById(categoryId: string) {
      return api.call().get(`/category/${categoryId}`);
   },
};

export default categoryApi;
