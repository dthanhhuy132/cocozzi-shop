import {GetServerSideProps} from 'next';
import {useEffect, useRef, useState} from 'react';
import panelApi from '../service/panelApi';

import {Shop, ShopProduct, ShopSliderBanner, ShopSliderProductStory} from '../components/Shop';

import productApi from '../service/productApi';
import useWindowDimensions from '../hooks/UseWindowDimensions';
import {LoadingPage} from '../components/LoadingPage';

import filterProductActive from '../helper/filterProductActive';
import {useAppSelector} from '../store';
import {Logo} from '../components/Logo';

import animateScrollTo from 'animated-scroll-to';

import {useIntersectionObserver} from 'usehooks-ts';
import {Footer} from '../components/Footer';

export default function ShopPage({productListByName, storyList}) {
   const {width} = useWindowDimensions();
   const {categoryProductState} = useAppSelector((state) => state.category);

   return (
      <div className='shop-container'>
         <div className='shop-item min-h-[100vh]'>
            <ShopSliderBanner />
         </div>

         {/* story product */}
         <div className='flex items-center mt-[50px] mx-0 py-5 md:py-0 md:mx-20 md:min-h-[91vh] shop-item'>
            <ShopSliderProductStory storyList={storyList} />
         </div>

         {/* shop category */}
         <div className='mx-0 md:mx-20 active-2 border-t-2 shop-item'>
            <div className='sticky top-[-1px] md:top-[0px] pb-3 md:pb-5 bg-white z-[50] flex justify-center border-b-[1px]'>
               <div className='flex gap-5 md:gap-x-10 mt-5 font-bold flex-wrap justify-center'>
                  {categoryProductState?.map((category, index) => (
                     <p
                        key={index}
                        className='uppercase text-[0.8rem] md:text-[0.9rem] whitespace-nowrap hover:underline cursor-pointer'>
                        {category.name}
                     </p>
                  ))}
               </div>
            </div>
            <div className='mt-[40px] md:mt-[70px] min-h-[100vh] shop-item mb-[50px]'>
               <ShopProduct productListByName={productListByName} />
            </div>
         </div>

         <div className='shop-item'>
            <Footer></Footer>
         </div>

         <LoadingPage>
            <Logo />
            <div>You are wellcome!!!</div>
         </LoadingPage>
      </div>
   );
}
export const getServerSideProps = async () => {
   let activeProduct;
   let storyList;
   // let activeCategory;
   try {
      const productRes = await productApi.getAllProductByName();
      const panelRes = await panelApi.getAllPanel();
      storyList = panelRes?.data?.data;

      // const categoryRes = await categoryApi.getAllCategory();

      const productListByName = productRes?.data?.data;

      activeProduct = filterProductActive(productListByName);
   } catch (error) {}

   return {
      props: {
         productListByName: activeProduct || [],
         storyList: storyList || [],
      },
   };
};
