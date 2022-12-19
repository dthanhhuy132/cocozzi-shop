import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {getAllPanelAsync} from './panelAsyncAction';

export const PANEL_FOR_STORY = '-panel-for-story';
export const PANEL_FOR_BANNER = '-panel-for-banner';
export const PANEL_FOR_HOME = '-panel-for-home';

interface IPanelSlice {
   eventState: any;
}
const initialState = {
   panelForStoryState: undefined,
   panelForBannerState: undefined,
   panelForHomeState: undefined,
   panelSliceForUser: undefined,
};

const PanelSlice = createSlice({
   name: 'eventSlice',
   initialState,
   reducers: {
      udpatePanelForUser: (state, action) => {
         const panelSliceForUser = action.payload;
      },
   },

   extraReducers: (builder) => {
      builder.addCase(getAllPanelAsync.fulfilled, (state, action) => {
         const panelList = action.payload.data;

         const panelForStory = panelList.filter(
            (item) => item?.description?.indexOf(PANEL_FOR_STORY) >= 0
         );
         const panelForBanner = panelList.filter(
            (item) => item?.description?.indexOf(PANEL_FOR_BANNER) >= 0
         );
         const panelForHome = panelList.filter(
            (item) => item?.description?.indexOf(PANEL_FOR_HOME) >= 0
         );

         state.panelForStoryState = panelForStory;
         state.panelForBannerState = panelForBanner;
         state.panelForHomeState = panelForHome;
      });
   },
});

export const {udpatePanelForUser} = PanelSlice.actions;
export default PanelSlice.reducer;
