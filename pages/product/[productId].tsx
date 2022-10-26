import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';
import useWindowDimensions from '../../hooks/UseWindowDimensions';

const imageArr = [
   '/images/shop/16.webp',
   '/images/shop/17.webp',
   '/images/shop/18.webp',
];

const SIZE = ['s', 'm', 'l', 'xl', 'xxl'];
const paymentLogo = [
   '/images/logoPayment/momo.png',
   '/images/logoPayment/zalo.webp',
   '/images/logoPayment/shopee.png',
   '/images/logoPayment/vnpay.png',
];

export default function ProductDetail() {
   const [isFixedInfoPosition, setFixedInfoPosition] = useState(false);
   const [productInfoLeft, setProductToLeft] = useState<any>('');

   const [sizeSelect, setSizeSelect] = useState('s');

   const productImgRef = useRef(null);
   const productInfoRef = useRef(null);
   useEffect(() => {
      // set stick for product information when window scrolling

      setProductToLeft(productInfoRef.current.getBoundingClientRect().left);

      function windownScroll() {
         const productInfoTopPos =
            productImgRef.current.getBoundingClientRect().top;

         if (productInfoTopPos <= 8) {
            setFixedInfoPosition(true);
         } else {
            setFixedInfoPosition(false);
         }
      }
      window.addEventListener('scroll', windownScroll);
      return () => window.removeEventListener('scroll', windownScroll);
   }, []);

   return (
      <div className='w-[1200px] flex mx-[auto] flex-col md:flex-row md:mt-5 px-20'>
         <div
            className='w-2/3 grid grid-cols-2 gap-2 auto-rows-fr'
            ref={productImgRef}>
            {/* video clip */}
            <video autoPlay muted loop className='w-full'>
               <source src='/videos/product.mp4' type='video/mp4' />
            </video>
            {/* image slider */}
            {imageArr.map((img, index) => (
               <div className='relative' key={index}>
                  <Image src={img} layout='fill' objectFit='cover' alt={img} />
               </div>
            ))}
         </div>
         {/* product info */}
         <div
            className={`${
               isFixedInfoPosition ? `fixed` : 'block w-1/3 '
            } top-2 w-[350px]`}
            style={{left: `${productInfoLeft}px`}}
            ref={productInfoRef}>
            {/* name */}
            <div className='ml-5 pb-5 font-semibold uppercase text-[1.2rem]'>
               <p>Product name</p>
               <p>Product short description</p>
            </div>
            {/* price */}
            <div className='mt-2 ml-5 pb-5 flex justify-between border-b-[1px]'>
               <div>
                  <span className='font-semibold text-[1.2rem] mr-2'>
                     {(456000).toLocaleString()} VNĐ
                  </span>
                  <span className='line-through text-gray-500 text-[0.9rem]'>
                     {(567000).toLocaleString()} VNĐ
                  </span>

                  <span className=' text-[#891b1c] font-semibold text-[0.9rem] ml-2'>
                     8%
                  </span>
               </div>
               <i className='fa-solid fa-share-nodes text-[1.5rem]'></i>
            </div>
            {/* size select */}
            <div className='flex flex-col gap-1 mt-5 ml-5 pb-5 border-b-[1px]'>
               <p>Size</p>
               <div className='flex gap-1'>
                  {SIZE.map((item, index) => (
                     <span
                        key={index}
                        className={`uppercase flex justify-center cursor-pointer w-[40px] border-[1px] text-[0.9rem] p-1 ${
                           item === sizeSelect && 'bg-[#891b1c] text-white'
                        }  `}
                        onClick={() => setSizeSelect(item)}>
                        {item}
                     </span>
                  ))}
               </div>
            </div>

            {/* payment */}
            <div className='flex flex-row gap-4 mt-7 pl-5'>
               {paymentLogo.map((item, index) => (
                  <img
                     src={item}
                     key={index}
                     className='w-[16px] h-[16px]'></img>
               ))}
            </div>

            {/* buy button */}
            <div className='md:flex md:mt-3 md:ml-5 md:gap-2'>
               <button className='w-[50%] py-1 bg-blue-900 text-white uppercase rounded-sm hover:bg-blue-700'>
                  Buy now
               </button>

               <button className='w-[50%] py-1 bg-blue-900 text-white uppercase rounded-sm hover:bg-blue-700'>
                  Add to cart
               </button>
            </div>
         </div>
      </div>
   );
}
