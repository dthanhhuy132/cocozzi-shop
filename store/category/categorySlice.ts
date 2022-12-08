import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

interface IAuthSlice {
   categoryState: any;
}
const initialState = {
   categoryState: undefined,
};

const categorySlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      updateCategory: (state, action) => {
         state.categoryState = action.payload;
      },
   },
});

export const {updateCategory} = categorySlice.actions;
export default categorySlice.reducer;
