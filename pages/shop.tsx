import {GetServerSideProps} from 'next';

import {
   Shop,
   ShopProduct,
   ShopSliderBanner,
   ShopSliderProductStory,
} from '../components/Shop';

import productApi from '../service/productApi';

export default function ShopPage({products = []}) {
   console.log('products cho nay la gi', products);
   return (
      <div className='justify-center'>
         <ShopSliderBanner />

         <div className='mt-5 mx-0 md:mx-20'>
            {/* story product */}
            <p className='text-[1.5rem] font-bold pl-4 md:pl-2 text-center'>
               Lorem, ipsum.
            </p>
            <ShopSliderProductStory />

            <div className='flex gap-3 mt-5 text-[1.2rem] font-bold pl-4 md:pl-2'>
               <p>MEN</p>
               <p>WOMEN</p>
            </div>
            <ShopProduct></ShopProduct>
         </div>
      </div>
   );
}

export const getServerSideProps: GetServerSideProps<any> = async () => {
   try {
      const response = await productApi.getAllProduct();

      return {
         props: {
            ok: true,
            products: response.data.data,
         },
      };
   } catch (error) {
      console.log('error trong shop tra ve la gi', error);
      return {
         props: {
            ok: false,
         },
      };
   }
};
