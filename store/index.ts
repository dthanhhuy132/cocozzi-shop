import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import authReducer from './auth/authSlice';
import cartReducer from './cart/cartSlice';
import categoryReducer from './category/categorySlice';
import eventReducer from './event/eventSlice';

const store = configureStore({
   reducer: {auth: authReducer, cart: cartReducer, category: categoryReducer, event: eventReducer},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type AppDispatch = typeof store.dispatch;
export type AppSelector = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
