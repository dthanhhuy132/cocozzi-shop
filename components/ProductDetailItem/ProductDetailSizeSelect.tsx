import React from 'react';

type Props = {};

const SIZE = ['s', 'm', 'l', 'xl', 'xxl'];
export default function ProductDetailSizeSelect({sizeSelect, setSizeSelect}) {
   return (
      <div className='flex flex-col gap-1 mt-2 md:mt-5 pb-2 border-b-[1px] md:pb-5'>
         <p className='text-center md:text-left'>Size</p>
         <div className='flex justify-between mx-9 md:mx-0'>
            {SIZE.map((item, index) => (
               <span
                  key={index}
                  className={`uppercase flex justify-center items-center cursor-pointer w-[40px] border-[1px] text-[0.9rem] p-0 md:p-1 md:px-1 ${
                     item === sizeSelect && 'bg-[#891a1c] text-white'
                  }  `}
                  onClick={() => setSizeSelect(item)}>
                  {item}
               </span>
            ))}
         </div>
      </div>
   );
}
