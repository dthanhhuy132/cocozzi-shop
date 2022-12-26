import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {getAllPanelAsync} from '../panel/panelAsyncAction';

interface IPaymentSlice {
   eventState: any;
}
const initialState = {
   paymentForUserState: undefined,
   allPaymentAmdminState: undefined,
};

const paymentSlice = createSlice({
   name: 'eventSlice',
   initialState,
   reducers: {
      updatePaymentForUser: (state, action) => {
         state.paymentForUserState = action.payload;
      },
   },

   extraReducers: (builder) => {
      builder.addCase(getAllPanelAsync.fulfilled, (state, action) => {
         const allPayment = action.payload.data;
         state.allPaymentAmdminState = allPayment;
      });
   },
});

export const {updatePaymentForUser} = paymentSlice.actions;
export default paymentSlice.reducer;
