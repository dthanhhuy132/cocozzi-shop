import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {loginAsyncAction} from './authAsyncAction';

import Cookies from 'js-cookie';
import {parseJwt} from '../../helper/parseJWT';

interface IAuthSlice {
   user: any;
   token: undefined | string;
}

const token = Cookies.get('token');
const user = parseJwt(token);

const initialState: IAuthSlice = {user, token};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
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

export const {logout} = authSlice.actions;
export default authSlice.reducer;
