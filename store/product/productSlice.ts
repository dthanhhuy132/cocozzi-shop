import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {getProductByNameAsync} from './productAsynAction';

interface IProductSlice {
   productList: any;
}
const initialState = {
   productListByGroupNameState: undefined,
   productListState: undefined,
};

const productSlice = createSlice({
   name: 'productSlice',
   initialState,
   reducers: {
      updateProductListByGroupName: (state, action) => {
         state.productListByGroupNameState = action.payload;
      },
   },

   extraReducers: (builder) => {
      builder.addCase(getProductByNameAsync.fulfilled, (state, action) => {
         const data = action.payload;

         console.log('data trong fulfill la gi', data);
         state.productListState = data.data;
      });
   },
});

export const {updateProductListByGroupName} = productSlice.actions;
export default productSlice.reducer;
