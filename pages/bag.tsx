import {useDispatch} from 'react-redux';
import {Bag} from '../components/Bag';
import {getTokenSSRAndCSS} from '../helper';
import cartApi from '../service/cartApi';

export default function BagPage({cartList}) {
   return <Bag carts={cartList} />;
}

export const getServerSideProps = async (context) => {
   let cartList;
   const [token, userToken] = getTokenSSRAndCSS(context);
   const userId = userToken?.data._id;

   try {
      const response = await cartApi.getCartByUserId(token, userId);

      cartList = response?.data?.data;
      console.log('response', cartList);
   } catch (error) {}

   return {
      props: {
         cartList: cartList || null,
      },
   };
};
