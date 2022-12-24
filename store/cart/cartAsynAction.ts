import {createAsyncThunk} from '@reduxjs/toolkit';
import cartApi from '../../service/cartApi';
import categoryApi from '../../service/categoryApi';

export const getCartByUserId: any = createAsyncThunk(
   'cart/getCartByUserId',
   async ({accessToken, userId}: any) => {
      try {
         // const res = await categoryApi.getAllCategory();
         const res = await cartApi.getCartByUserId(accessToken, userId);

         const cartItem = res.data.data.cartItems;

         return {
            ok: true,
            data: cartItem,
         };
      } catch (error) {
         return {
            ok: false,
         };
      }
   }
);

export const removeCartItem: any = createAsyncThunk(
   'cart/removeCartItem',
   async ({accessToken, cartRemoveData}: any) => {
      async () => {
         try {
            // const res = await categoryApi.getAllCategory();

            // const res = await cartApi.removeCartItem(accessToken, removeCartItem);
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
   }
);

export const addCartItem: any = createAsyncThunk(
   'cart/addCartItem',
   async ({accessToken, cartData}: any) => {
      async () => {
         try {
            // const res = await cartApi.removeCartItem(accessToken, cartData);
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
   }
);
