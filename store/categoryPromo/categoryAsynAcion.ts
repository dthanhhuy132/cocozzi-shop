import {createAsyncThunk} from '@reduxjs/toolkit';
import categoryApi from '../../service/categoryApi';
import productApi from '../../service/productApi';

export const getAllCategoryAsync: any = createAsyncThunk('category/getAllCategory', async () => {
   try {
      const res = await categoryApi.getAllCategory();

      console.log('res cho nay la gi trong get getAllCategoryAsync', res);
      return {
         ok: true,
         // data: res.data.res,
      };
   } catch (error) {
      return {
         ok: false,
      };
   }
});

export const deleteCategory: any = createAsyncThunk(
   'category/getAllCategory',
   async ({token, id}: any) => {
      try {
         const res = await categoryApi.deleteCategory(token, id);

         console.log('res cho nay la gi trong get getAllCategoryAsync', res);
         return {
            ok: true,
            // data: res.data.res,
         };
      } catch (error) {
         return {
            ok: false,
         };
      }
   }
);

export const createNewCategoryAsync: any = createAsyncThunk(
   'category/create',
   async ({accessToken, formData}: any) => {
      try {
         const res = await categoryApi.createCategory(accessToken, formData);

         return {
            ok: true,
         };
      } catch (error) {
         return {
            ok: false,
            message: error.response.data.message,
         };
      }
   }
);
