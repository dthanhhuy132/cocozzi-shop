import {GetServerSideProps} from 'next';
import {useEffect, useRef, useState} from 'react';

import {Shop, ShopProduct, ShopSliderBanner, ShopSliderProductStory} from '../components/Shop';

import productApi from '../service/productApi';
import useWindowDimensions from '../hooks/UseWindowDimensions';
import {LoadingPage} from '../components/LoadingPage';

import animateScrollTo from 'animated-scroll-to';
import useGlobalState from '../state';
import debouce from 'lodash.debounce';
import filterProductActive from '../helper/filterProductActive';
import {useAppSelector} from '../store';

export default function ShopPage() {
   const {isMobile} = useWindowDimensions();
   const [isMobileDevice, setIsMobileDevice] = useState(false);

   const {categoryProductState} = useAppSelector((state) => state.category);

   const ref1 = useRef(null);
   const ref2 = useRef(null);
   const ref3 = useRef(null);

   useEffect(() => {
      if (isMobile) {
         setIsMobileDevice(true);
      } else {
         setIsMobileDevice(false);
      }
   }, [isMobile]);

   useEffect(() => {
      window.scrollTo({top: 0});
      let lastScrollTop = 0;

      function detectScroll() {
         if (isMobileDevice) return;
         const ref1OFT = ref1?.current?.offsetTop;
         const ref2OFT = ref2?.current?.offsetTop;
         const ref3OFT = ref3?.current?.offsetTop;

         if (isMobileDevice) return;
         let st = window.pageYOffset || document.documentElement.scrollTop;

         if (st > lastScrollTop) {
            // downscroll code
            if (st > ref1OFT && st < ref2OFT + 200) {
               animateScrollTo(ref2OFT, {speed: 100});
            }
            if (st > ref2OFT && st < ref3OFT) {
               animateScrollTo(ref3OFT, {speed: 100});
            }
         } else if (st < lastScrollTop) {
            if (st < ref2OFT) {
               animateScrollTo(0, {speed: 100});
            }
            if (st > ref2OFT && st < ref3OFT) {
               animateScrollTo(ref2OFT, {speed: 100});
            }
         }
         lastScrollTop = st <= 0 ? 0 : st;
      }
      document.addEventListener('scroll', () => setTimeout(detectScroll, 0));
      return () => {
         document.removeEventListener('scroll', () => setTimeout(detectScroll, 0));
      };
   }, []);

   return (
      <div className=''>
         <div className='active-0' ref={ref1}>
            <ShopSliderBanner />
         </div>
         <div
            className='flex items-center pt-20 md:pt-10 mx-0 md:mx-20 h-full md:h-[100vh] active-1'
            ref={ref2}>
            {/* story product */}
            <ShopSliderProductStory />
         </div>
         <div className='mx-0 md:mx-20 md:h-full active-2' ref={ref3}>
            <div className='sticky top-[35px] md:top-[50px] pb-3 md:pb-5 bg-white z-10 flex justify-center  border-b-[1px]'>
               <div className='flex gap-y-5 gap-x-5 md:gap-x-10 mt-5 font-bold'>
                  {categoryProductState &&
                     categoryProductState.map((category) => (
                        <p key={category._id} className='uppercase'>
                           {category.name}
                        </p>
                     ))}
               </div>
            </div>
            <div className='mt-[40px] md:mt-[70px]'>
               <ShopProduct />
            </div>
         </div>
         <LoadingPage>Shop page loading</LoadingPage>;
      </div>
   );
}
