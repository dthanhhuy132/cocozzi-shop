import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {loginAsyncAction} from './authAsyncAction';

import Cookies from 'js-cookie';
import {parseJwt} from '../../helper';

interface IAuthSlice {
   user: any;
   accessToken: undefined | string | null;
}

const accessToken = Cookies.get('accessToken');
const user = parseJwt(accessToken);

const initialState: IAuthSlice = {user: user, accessToken: accessToken};

const authSlice = createSlice({
   name: 'authSlice',
   initialState,
   reducers: {
      logout: (state) => {
         Cookies.remove('accessToken');
         state.user = {};
         state.accessToken = undefined;
      },
   },
   extraReducers: {
      [loginAsyncAction.fulfilled]: (state, action) => {
         state.user = action.payload?.user?.user;
         state.accessToken = action.payload?.user?.accessToken;
      },
   },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
