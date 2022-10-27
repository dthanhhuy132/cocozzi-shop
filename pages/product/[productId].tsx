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

   const [sizeSelect, setSizeSelect] = useState('');

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
      <div className='flex flex-col-reverse mt-2 mx-[auto]  md:flex-row md:mt-5 md:px-20 lg:w-[1200px]'>
         <div
            className='grid grid-cols-1 gap-2 auto-rows-fr md:w-2/3 md:grid-cols-2 '
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
               isFixedInfoPosition ? `md:fixed` : 'md:block md:w-1/3 '
            } top-0 right-0 left-0 w-full px-2 md:px-5 md:top-2 md:w-[350px]`}
            style={{left: `${productInfoLeft}px`}}
            ref={productInfoRef}>
            {/* name */}
            <div className='pb-0 md:pb-5 font-semibold uppercase text-[1.2rem] '>
               <p>Product name</p>
               <p>Product short description</p>
            </div>
            {/* price */}
            <div className='mt-2 pb-2 md:pb-5 flex justify-between border-b-[1px]'>
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

            {/* payment */}
            <div className='fixed bottom-0 right-0 left-0 md:relative px-2 pb-1 md:mx-0 bg-black opacity-80 rounded-tr-[80px] rounded-tl-[80px] md:bg-transparent text-white md:text-black'>
               {/* size select */}
               <div className='flex flex-col gap-1 mt-2 md:mt-5 pb-2 border-b-[1px] md:pb-5'>
                  <p className='text-center md:text-left'>Size</p>
                  <div className='flex justify-between mx-9 md:mx-0'>
                     {SIZE.map((item, index) => (
                        <span
                           key={index}
                           className={`uppercase flex justify-center items-center cursor-pointer w-[40px] border-[1px] text-[0.9rem] p-0 md:px-1 ${
                              item === sizeSelect && 'bg-[#891b1c] text-white'
                           }  `}
                           onClick={() => setSizeSelect(item)}>
                           {item}
                        </span>
                     ))}
                  </div>
               </div>

               <div className='flex flex-row justify-center gap-4 mt-2 mb-2 md:justify-start md:mt-7'>
                  {paymentLogo.map((item, index) => (
                     <img
                        src={item}
                        key={index}
                        className='w-[16px] h-[16px]'></img>
                  ))}
               </div>

               {/* buy button */}
               <div className='flex md:mt-3 gap-2'>
                  <button className='w-[50%] py-1 md:py-2 uppercase rounded-sm border-[1px] border-gray-400 hover:text-white hover:bg-black'>
                     Buy now
                  </button>

                  <button className='w-[50%] py-1 md:py-2 uppercase rounded-sm border-[1px] border-gray-400 hover:text-white hover:bg-black'>
                     Add to cart
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
