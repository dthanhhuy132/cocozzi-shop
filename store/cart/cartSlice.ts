import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface IAuthSlice {
   cartState: any;
}
const initialState = {
   cartState: undefined,
};

const cartSlice = createSlice({
   name: 'cartSlice',
   initialState,
   reducers: {
      updateCart: (state, action: PayloadAction<any>) => {
         state.cartState = action.payload;
      },
   },
});

export const {updateCart} = cartSlice.actions;
export default cartSlice.reducer;
