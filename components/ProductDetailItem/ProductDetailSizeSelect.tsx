import React from 'react';

type Props = {};

const SIZE = ['s', 'm', 'l', 'xl', 'xxl'];
export default function ProductDetailSizeSelect({sizeSelect, setSizeSelect}) {
   return (
      <div className='flex gap-1 mx-3 md:mx-0  md:pt-5 py-2 border-b-[1px] md:pb-5 border-t-[1px]'>
         <p className='text-left min-w-[70px]'>Size: </p>
         <div className='flex justify-between w-full'>
            {SIZE.map((item, index) => (
               <div
                  key={index}
                  className={`uppercase text-center cursor-pointer w-[40px] border-[1px] text-[0.9rem] p-0 block ${
                     item === sizeSelect && 'bg-[#891a1c] text-white'
                  }  `}
                  onClick={() => setSizeSelect(item)}>
                  {item}
               </div>
            ))}
         </div>
      </div>
   );
}
