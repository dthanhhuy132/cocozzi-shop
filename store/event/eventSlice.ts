import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

interface IEventSlice {
   eventState: any;
}
const initialState = {
   eventState: undefined,
};

const eventSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      updateEvent: (state, action) => {
         state.eventState = action.payload;
      },
   },
});

export const {updateEvent} = eventSlice.actions;
export default eventSlice.reducer;
