import api from './api';

const voucherApi = {
   getAllVoucher: () => {
      return api.call().get('/promotion/all');
   },

   getVoucherById: () => {
      return {};
   },

   getVoucherByCode: (token, voucherCode) => {
      return api.callWithToken(token).get(`/promotion/code/${voucherCode}`);
   },

   createVoucher: (token, data) => {
      return api.callWithToken(token).post(`/promotion/create`, data);
   },

   deleteVoucher: (token, promotionId) => {
      return api.callWithToken(token).delete(`/promotion/${promotionId}`);
   },

   updateVoucher: (token, voucherId, data) => {
      return api.callWithToken(token).put(`/promotion/${voucherId}`, data);
   },
};

export default voucherApi;
