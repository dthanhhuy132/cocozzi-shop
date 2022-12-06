import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';
import {BsShare} from 'react-icons/bs';

import {
   ProductDescription,
   ProductDetailColorSelect,
   ProductDetailPaymentMethod,
   ProductDetailReview,
   ProductDetailSizeSelect,
} from '../../components/ProductDetailItem';

import SliderSlick from 'react-slick';
import useGlobalState from '../../state';
import useWindowDimensions from '../../hooks/UseWindowDimensions';
import slickSliderMobile from '../../helper/slickSliderMobile';

const imageArr = [
   '/images/shop/16.webp',
   '/images/shop/17.webp',
   '/images/shop/18.webp',
   '/images/shop/18.webp',
   '/images/shop/16.webp',
   '/images/shop/17.webp',
   '/images/shop/18.webp',
];

export default function ProductDetailPage() {
   const {isMobile} = useWindowDimensions();
   const [isMobileScreen, setIsMobileScreen] = useState(false);
   const [sizeSelect, setSizeSelect] = useState('');
   const [colorSelect, setColorSelect] = useState(0);

   const [isShowSizeAndColor, setIsShowSizeAndColor] = useState(false);

   const settings = {
      className: 'center w-full',
      infinite: true,
      dots: true,
      slidesToShow: 1,
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 2000,
      customPaging: function (i) {
         return <div className='dot'></div>;
      },
      dotsClass: 'slick-dots slick-thumb-custom',
      prevArrow: false,
      nextArrow: false,
      scrollBar: true,
      beforeChange: () => slickSliderMobile(),
   };

   // create first width for active slider
   useEffect(() => {
      if (isMobile) {
         setIsMobileScreen(true);
      } else {
         setIsMobileScreen(false);
      }
   }, [isMobile]);
   useEffect(() => slickSliderMobile(), []);

   return (
      <div className='md:px-20 md:w-[780px] lg:w-[1200px] mx-[auto]'>
         {/* product image */}
         <div className='flex flex-col-reverse mt-2 md:flex-row md:mt-5 '>
            <div className='hidden md:grid grid-cols-2 gap-1 md:w-2/3 '>
               {/* video clip */}
               {/* <video autoPlay muted loop className='w-full'>
                  <source src='/videos/product.mp4' type='video/mp4' />
               </video> */}
               {/* image slider */}
               {imageArr.map((img, index) => (
                  <div className='relative' key={index}>
                     <img src={img} className='w-full h-auto' alt={img} />
                  </div>
               ))}
            </div>

            <div className='md:hidden'>
               <SliderSlick {...settings}>
                  {imageArr.map((img, index) => (
                     <div className='relative' key={index}>
                        <img src={img} className='w-full h-auto' alt={img} />
                     </div>
                  ))}
               </SliderSlick>
               <ProductDescription></ProductDescription>
            </div>

            {/* product info */}
            <div className='w-full md:pl-5 md:top-2 md:w-[350px]'>
               {/* name */}
               <div className='px-2 md:px-0 md:sticky top-20'>
                  <p className='pb-0 md:pb-5 font-semibold text-[1.2rem] '>
                     Product name Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                     Voluptas, officia.
                  </p>

                  {/* price */}
                  <div className='mt-2 pb-2 md:pb-5 flex justify-between items-center border-b-[1px]'>
                     <div>
                        <span className='font-semibold text-[1.2rem] mr-2'>
                           {(456000).toLocaleString()} VNĐ
                        </span>
                        <span className='line-through text-gray-500 text-[0.9rem]'>
                           {(567000).toLocaleString()} VNĐ
                        </span>

                        <span className='text-[#891a1c] font-semibold text-[0.9rem] ml-2'>8%</span>
                     </div>
                     <BsShare fontSize='1.3rem' cursor='pointer' className='hover:text-[#891a1c]' />
                  </div>

                  {/* product description */}
                  {!isMobileScreen && <ProductDescription></ProductDescription>}

                  {/* payment */}

                  <div className='fixed bottom-0 right-0 left-0 md:relative md:mx-0 md:bg-transparent text-black md:text-black z-[101] '>
                     <div
                        className={`absolute bg-white md:bg-transparent w-full md:relative md:bottom-[unset] md:opacity-100 transition-all ${
                           isShowSizeAndColor ? 'bottom-[100%]' : 'bottom-[-500%] '
                        }`}>
                        {/* size select */}
                        <ProductDetailSizeSelect
                           sizeSelect={sizeSelect}
                           setSizeSelect={setSizeSelect}
                        />
                        {/* color select */}
                        <ProductDetailColorSelect
                           setColorSelect={setColorSelect}
                           colorSelect={colorSelect}
                        />

                        <div className='hidden md:block'>
                           <ProductDetailPaymentMethod />
                        </div>
                     </div>

                     {/* buy button */}
                     <div className='flex md:mt-3 md:gap-1 relative z-[120] font-[900] text-white md:text-black'>
                        <button
                           className='w-[50%] py-2 uppercase bg-black md:bg-[transparent] md:border-[1px] hover:text-white md:hover:bg-black border-r-[1px] border-[#fff] md:border-black'
                           onClick={() => {
                              isMobile && setIsShowSizeAndColor(!isShowSizeAndColor);
                           }}>
                           Buy now
                        </button>

                        <button
                           className='w-[50%] py-2 uppercase bg-black md:bg-[transparent] md:border-[1px] border-black md:hover:text-white md:hover:bg-black'
                           onClick={() => {
                              isMobile && setIsShowSizeAndColor(!isShowSizeAndColor);
                           }}>
                           Add to cart
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* Product review */}
         {/* <ProductDetailReview /> */}
      </div>
   );
}
