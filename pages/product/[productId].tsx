import Image from 'next/image';
import {useEffect, useState} from 'react';
import ImageGallery from 'react-image-gallery';
import useWindowDimensions from '../../hooks/UseWindowDimensions';
const imageArr = [
   '/images/shop/16.webp',
   '/images/shop/17.webp',
   '/images/shop/18.webp',
];
const imgaesSlider = imageArr.map((item) => {
   return {
      original: item,
      thumbnail: item,
   };
});

const SIZE = ['s', 'm', 'l', 'xl', 'xxl'];
const paymentLogo = [
   '/images/logoPayment/momo.png',
   '/images/logoPayment/zalo.webp',
   '/images/logoPayment/shopee.png',
   '/images/logoPayment/vnpay.png',
];
export default function ProductDetail() {
   let [isMobile, setIsMobile] = useState(true);
   const [sizeSelect, setSizeSelect] = useState('s');
   const {width} = useWindowDimensions();
   useEffect(() => {
      if (width < 640) {
         setIsMobile(true);
      } else {
         setIsMobile(false);
      }
   }, [width]);

   console.log('isMobile', isMobile);

   return (
      <div className='flex flex-col md:flex-row md:justify-center md:mt-5'>
         <div className='w-full md:w-[400px]'>
            <ImageGallery
               items={imgaesSlider}
               showNav={false}
               autoPlay={true}
               showFullscreenButton={false}
               showPlayButton={false}
               showThumbnails={isMobile ? false : true}
               bulletClass='cursor-none'
            />
         </div>

         <div className='mt-7 md:mt-[unset]'>
            {/* name */}
            <div className='pl-5'>
               <p>Product name</p>
               <p>Product short description</p>
            </div>
            {/* price */}
            <div className='mt-5 pl-5'>
               <p className='font-bold line-through text-gray-500'>
                  {(567000).toLocaleString()} VNĐ
               </p>
               <p className='font-bold text-[#891b1c]'>
                  {(456000).toLocaleString()} VNĐ
               </p>
            </div>
            {/* size select */}
            <div className='mt-7 flex gap-5 pl-5'>
               <span>SIZE:</span>
               <div className='flex'>
                  {SIZE.map((item, index) => (
                     <span
                        key={index}
                        className={`uppercase flex justify-center cursor-pointer w-[40px] ${
                           item === sizeSelect && 'bg-[#891b1c] text-white'
                        }  `}
                        onClick={() => setSizeSelect(item)}
                     >
                        {item}
                     </span>
                  ))}
               </div>
            </div>

            {/* payment */}
            {isMobile && (
               <div className='flex flex-row gap-4 mt-7 pl-5'>
                  {paymentLogo.map((item, index) => (
                     <img
                        src={item}
                        key={index}
                        className='w-[16px] h-[16px]'
                     ></img>
                  ))}
               </div>
            )}

            {/* button buy */}
            <div className='flex md:flex-col mt-7 md:gap-2  md:pl-5'>
               <button className='w-[50%] md:w-[200px] py-1 bg-blue-900 text-white uppercase hover:bg-blue-700'>
                  Buy now
               </button>

               <button className='w-[50%] md:w-[200px] py-1 bg-blue-900 text-white uppercase hover:bg-blue-700'>
                  Add to cart
               </button>
            </div>

            {/* payment down */}
            {!isMobile && (
               <div className='flex flex-row gap-4 mt-7 pl-5'>
                  {paymentLogo.map((item, index) => (
                     <img
                        src={item}
                        key={index}
                        className='w-[16px] h-[16px]'
                     ></img>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}
