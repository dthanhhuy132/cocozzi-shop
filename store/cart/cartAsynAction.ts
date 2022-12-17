import {createAsyncThunk} from '@reduxjs/toolkit';
import categoryApi from '../../service/categoryApi';

export const getAllCarts: any = createAsyncThunk('category/getAllCategory', async () => {
   async () => {
      try {
         // const res = await categoryApi.getAllCategory();

         console.log('res cho nay la gi trong get getAllCategoryAsync');
         return {
            ok: true,
            // data: res.data.res,
         };
      } catch (error) {
         return {
            ok: false,
         };
      }
   };
});
