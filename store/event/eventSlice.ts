import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {getAllEventAsync} from './eventAsynAction';

interface IEventSlice {
   eventState: any;
}
const initialState = {
   eventState: undefined,
};

const eventSlice = createSlice({
   name: 'eventSlice',
   initialState,
   reducers: {
      updateEvent: (state, action) => {
         state.eventState = action.payload;
      },
   },

   extraReducers: (builder) => {
      builder.addCase(getAllEventAsync.fulfilled, (state, action) => {
         const eventList = action.payload.data;
         const eventActive = eventList?.filter((event) => event.status == true) || [];
         state.eventState = eventActive;
      });
   },
});

export const {updateEvent} = eventSlice.actions;
export default eventSlice.reducer;
