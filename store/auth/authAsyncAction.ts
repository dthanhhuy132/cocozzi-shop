import {createAsyncThunk} from '@reduxjs/toolkit';
import authApi from '../../service/authApi';

export const loginAsyncAction: any = createAsyncThunk('auth/login', async (loginData: any) => {
   try {
      console.log('login data trong login la gi', loginData);
      const response = await authApi.login(loginData);
      return {
         ok: true,
         user: response.data.data,
      };
   } catch (error) {
      return {ok: false, message: error.response.data.message};
   }
});

export const registerAsyncAction: any = createAsyncThunk(
   'auth/regiter',
   async (regiterData: any) => {
      try {
         const response = await authApi.register(regiterData);
         console.log('response tra vef trong asyns la gi', response.data.data);
         return {
            ok: true,
            data: response.data.data,
         };
      } catch (error) {
         return {ok: false, message: error.response.data.message};
      }
   }
);
