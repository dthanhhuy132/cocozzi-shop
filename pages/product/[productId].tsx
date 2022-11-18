import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';
import {BsShare} from 'react-icons/bs';

import startImg from '../../public/images/star.png';

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

const customerSatisfied = [
   {name: 'Very Good', reivews: 36, amount: 6},
   {name: 'Good', reivews: 12, amount: 12},
   {name: 'Normal', reivews: 2, amount: 21},
   {name: 'Bad', reivews: 1, amount: 19},
   {name: 'Too Bad', reivews: 2, amount: 2},
];

export default function ProductDetail() {
   const [sizeSelect, setSizeSelect] = useState('');

   return (
      <div className='md:px-20 lg:w-[1120px] mx-[auto] mb-[300px]'>
         {/* product introduction */}
         <div className='flex flex-col-reverse mt-2 md:flex-row md:mt-5 '>
            <div className='grid grid-cols-1 gap-2 auto-rows-fr md:w-2/3 md:grid-cols-2 '>
               {/* video clip */}
               <video autoPlay muted loop className='w-full'>
                  <source src='/videos/product.mp4' type='video/mp4' />
               </video>
               {/* image slider */}
               {imageArr.map((img, index) => (
                  <div className='relative' key={index}>
                     <Image
                        src={img}
                        layout='fill'
                        objectFit='cover'
                        alt={img}
                     />
                  </div>
               ))}
            </div>
            {/* product info */}
            <div className=' w-full md:pl-5 md:top-2 md:w-[350px]'>
               {/* name */}
               <div className='px-2 md:px-0 md:sticky top-20'>
                  <p className='pb-0 md:pb-5 font-semibold text-[1.2rem] '>
                     Product name Lorem ipsum dolor sit, amet consectetur
                     adipisicing elit. Voluptas, officia.
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

                        <span className='text-[#891b1c] font-semibold text-[0.9rem] ml-2'>
                           8%
                        </span>
                     </div>
                     <BsShare
                        fontSize='1.3rem'
                        cursor='pointer'
                        className='hover:text-[#891b1c]'
                     />
                  </div>

                  {/* product description */}
                  <p className='my-2  md:mt-7'>
                     Product description Lorem ipsum dolor, sit amet consectetur
                     adipisicing elit. Accusantium ex doloribus reiciendis.
                     Officiis possimus tempore molestias iure quaerat, doloribus
                     quas!
                  </p>
                  {/* payment */}

                  <div className='fixed bottom-0 right-0 left-0 md:relative pb-1 md:mx-0 bg-black opacity-80 md:bg-transparent text-white md:text-black'>
                     {/* size select */}
                     <div className='flex flex-col gap-1 mt-2 md:mt-5 pb-2 border-b-[1px] md:pb-5'>
                        <p className='text-center md:text-left'>Size</p>
                        <div className='flex justify-between mx-9 md:mx-0'>
                           {SIZE.map((item, index) => (
                              <span
                                 key={index}
                                 className={`uppercase flex justify-center items-center cursor-pointer w-[40px] border-[1px] text-[0.9rem] p-0 md:p-1 md:px-1 ${
                                    item === sizeSelect &&
                                    'bg-[#891b1c] text-white'
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
         </div>
         {/* Product review */}
         <div className='my-10 md:my-20'>
            <p className='px-2 md:px-[unset] uppercase text-[1.4rem] font-bold border-b-[1px] border-black'>
               Reviews <span>(20)</span>
            </p>

            <div className='flex flex-col md:flex-row md:gap-10 my-0 md:my-7 py-0'>
               {/* Total review */}
               <div className='flex flex-col pb-5 items-center justify-center md:w-1/3 md:border-r-[1px] '>
                  <div className='flex items-center justify-center gap-3 '>
                     <Image
                        src={startImg}
                        height='60px'
                        width='60px'
                        objectFit='contain'
                     />
                     <p className='font-bold text-[4rem]'>4.6</p>
                  </div>
                  <p>
                     <span className='font-bold'>100%</span> Customer like this
                     product
                  </p>
               </div>

               {/* Detail review */}
               <div className='md:w-2/3 px-2 flex flex-col justify-center'>
                  {customerSatisfied.map((item, index) => {
                     const percent = (item.reivews / 40) * 100;
                     return (
                        <div key={index} className='flex items-center gap-3'>
                           <p className='whitespace-nowrap min-w-[80px]'>
                              {item.name}
                           </p>
                           <div className='relative w-full bg-[#ebeff5] h-[14px] rounded-lg'>
                              <div
                                 className={`absolute top-0 left-0 bottom-0 bg-black rounded-lg`}
                                 style={{width: `${percent}%`}}></div>
                           </div>
                           <p className='min-w-[20px]'>{item.reivews}</p>
                        </div>
                     );
                  })}
               </div>
            </div>

            {/* Comment */}
            <div className='border-b-[1px] my-5 md:my-0'></div>
         </div>
      </div>
   );
}
