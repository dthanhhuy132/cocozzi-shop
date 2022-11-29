import {GetServerSideProps} from 'next';
import {useEffect, useRef, useState} from 'react';

import animateScrollTo from 'animated-scroll-to';
import {
   Shop,
   ShopProduct,
   ShopSliderBanner,
   ShopSliderProductStory,
} from '../components/Shop';

import productApi from '../service/productApi';
import useWindowDimensions from '../hooks/UseWindowDimensions';
import {LoadingPage} from '../components/LoadingPage';

export default function ShopPage({products = []}) {
   const [isScrolling, setIsScrolling] = useState(false);

   const {isMobile} = useWindowDimensions();

   useEffect(() => {
      window.scrollTo({top: 0});
      let lastScrollTop = 0;

      function detectScroll() {
         if (isMobile) return;
         let st = window.pageYOffset || document.documentElement.scrollTop;
         const windowHeight = window.innerHeight;
         const scrolllDown = st > lastScrollTop ? true : false;

         if (scrolllDown) {
            // downscroll code
            if (st < windowHeight) {
               if (isScrolling) return;
               setIsScrolling(true);
               setTimeout(() => {
                  animateScrollTo(windowHeight, {speed: 100});
               }, 0);
               setIsScrolling(false);
            }

            if (st > windowHeight && st < windowHeight * 2) {
               if (isScrolling) return;
               setIsScrolling(true);
               setTimeout(() => {
                  animateScrollTo(windowHeight * 2, {speed: 100});
               }, 0);
               setIsScrolling(false);
            }
         } else {
            // upscroll code
            if (st < windowHeight - 50) {
               if (isScrolling) return;
               setIsScrolling(true);
               setTimeout(() => {
                  animateScrollTo(0, {speed: 100});
               }, 0);

               setIsScrolling(false);
            } else if (st > windowHeight && st < windowHeight * 2) {
               if (isScrolling) return;
               setIsScrolling(true);
               setTimeout(() => {
                  animateScrollTo(windowHeight, {speed: 100});
               }, 0);

               setIsScrolling(false);
            }
         }
         lastScrollTop = st <= 0 ? 0 : st;
      }
      document.addEventListener('scroll', detectScroll);
      return () => {
         document.removeEventListener('scroll', detectScroll);
      };
   }, []);

   return (
      <div className=''>
         <div className='active-0'>
            <ShopSliderBanner />
         </div>
         <div className='my-10 md:pt-10 mx-0 md:mx-20 md:h-[100vh] active-1'>
            {/* story product */}
            <p className='text-[1.5rem] font-bold my-4 pl-4 md:pl-2 text-center'>
               Story product slider
            </p>
            <ShopSliderProductStory />
         </div>
         <div className='mx-0 md:mx-20 md:min-h-full active-2'>
            <div className='sticky top-[35px] md:top-[55px] pb-3 md:pb-5 bg-white z-10 flex justify-center  border-b-[1px]'>
               <div className='flex gap-3 mt-5 text-[1rem] md:text-[1.1rem] font-bold pl-4 md:pl-2'>
                  <p>MEN</p>
                  <p>WOMEN</p>
               </div>
            </div>
            <ShopProduct></ShopProduct>
         </div>
         <LoadingPage>Shop page loading</LoadingPage>;
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
