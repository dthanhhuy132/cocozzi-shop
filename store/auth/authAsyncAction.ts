import {createAsyncThunk} from '@reduxjs/toolkit';
import authApi from '../../service/authApi';

export const loginAsyncAction: any = createAsyncThunk(
   'auth/login',
   async (loginData: any) => {
      try {
         const response = await authApi.login(loginData);

         return {
            ok: true,
            user: response.data.data,
         };
      } catch (error) {
         return {ok: false, message: error.response.data.message};
      }
   }
);
