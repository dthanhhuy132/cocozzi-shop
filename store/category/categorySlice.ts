import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface IAuthSlice {
   categories: any;
}
const initialState = {
   categories: [],
};

const categorySlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      updateCategory: (state, action) => {
         state.categories = action.payload;
      },
   },
});

export const {updateCategory} = categorySlice.actions;
export default categorySlice.reducer;
