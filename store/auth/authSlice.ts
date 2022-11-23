import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {loginAsyncAction} from './authAsyncAction';

import Cookies from 'js-cookie';
import {parseJwt} from '../../helper';

interface IAuthSlice {
   user: any;
   token: undefined | string;
}

const initialState: IAuthSlice = {
   user: null,
   token: Cookies.get('token') || '',
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      login: (state, action) => {
         const userToken = parseJwt(action.payload);
         state.user = userToken;
         state.token = action.payload;
      },
      logout: (state) => {
         Cookies.remove('token');
         state.user = {};
         state.token = '';
      },
   },
   extraReducers: {
      [loginAsyncAction.fulfilled]: (state, action) => {
         state.user = action.payload?.user?.user;
         state.token = action.payload?.user?.accessToken;
      },
   },
});

export const {logout, login} = authSlice.actions;
export default authSlice.reducer;
