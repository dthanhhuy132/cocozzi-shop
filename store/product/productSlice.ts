import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {getProductByNameAsync} from './productAsynAction';

interface IProductSlice {
   productList: any;
}
const initialState = {
   productByGroupNameForUser: undefined,
   productListState: undefined,
};

const productSlice = createSlice({
   name: 'productSlice',
   initialState,
   reducers: {
      updateProductByGroupNameForUser: (state, action) => {
         state.productByGroupNameForUser = action.payload;
      },
   },

   extraReducers: (builder) => {
      builder.addCase(getProductByNameAsync.fulfilled, (state, action) => {
         const data = action.payload;

         state.productListState = data.data;
      });
   },
});

export const {updateProductByGroupNameForUser} = productSlice.actions;
export default productSlice.reducer;
