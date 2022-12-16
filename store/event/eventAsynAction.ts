import {createAsyncThunk} from '@reduxjs/toolkit';
import eventApi from '../../service/eventApi';

export const getAllEventAsync: any = createAsyncThunk('event/getAllEvent', async () => {
   try {
      const res = await eventApi.getAllEvent();
      // console.log('res cho nay la gi', res);
      console.log('res cho get all evetn la gi', res);
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

export const createEventAsyns: any = createAsyncThunk(
   'event/createNewEvent',
   async ({accessToken, formData}: any) => {
      try {
         const res = await eventApi.createEvent(accessToken, formData);

         console.log('res cho nay la gi', res);
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
