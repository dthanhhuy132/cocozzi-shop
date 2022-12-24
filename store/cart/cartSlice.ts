import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {getCartByUserId} from './cartAsynAction';

interface IAuthSlice {
   cartState: any;
}
const initialState = {
   cartState: [],
};

const cartSlice = createSlice({
   name: 'cartSlice',
   initialState,
   reducers: {
      updateCart: (state, action: PayloadAction<any>) => {
         state.cartState = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getCartByUserId.fulfilled, (state, action) => {
         const cartItemArr = action.payload.data;
         state.cartState = cartItemArr;
      });
   },
});

export const {updateCart} = cartSlice.actions;
export default cartSlice.reducer;
