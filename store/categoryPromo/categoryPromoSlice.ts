import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {getAllCategoryAsync} from './categoryAsynAcion';

interface IAuthSlice {
   categoryProductState: any;
}
const initialState = {
   categoryProductState: undefined,
   allCategoryState: undefined,
   allPromoState: undefined,
};

const categoryPromoSlice = createSlice({
   name: 'categoryPromoSlice',
   initialState,
   reducers: {
      updateCategoryProduct: (state, action) => {
         state.categoryProductState = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getAllCategoryAsync.fulfilled, (state, action) => {
         const allPromo = action.payload;
         // state.eventState = data.data;
      });
   },
});

export const {updateCategoryProduct} = categoryPromoSlice.actions;
export default categoryPromoSlice.reducer;
