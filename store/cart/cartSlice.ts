import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface IAuthSlice {
   cart: any;
}
const initialState = {
   cart: [],
};

const cartSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      updateCart: (state, action: PayloadAction<any>) => {
         state.cart = action.payload;
      },
   },
});

export const {updateCart} = cartSlice.actions;
export default cartSlice.reducer;
