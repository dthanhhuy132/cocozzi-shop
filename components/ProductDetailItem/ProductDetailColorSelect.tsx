import React from 'react';

const COLOR = ['#8b7053', '#891a1c', '#ff0000', '#3b3533', '#657b33'];

export default function ProductDetailColorSelect({
   colorSelect,
   setColorSelect,
}) {
   return (
      <div className='flex flex-col gap-1 mt-2 md:mt-5 pb-2 border-b-[1px] md:pb-5'>
         <p className='text-center md:text-left'>Color</p>
         <div className='flex justify-between mx-9 md:mx-0'>
            {COLOR.map((colorItem, index) => (
               <div
                  key={index}
                  className={`border-[4px] p-[2px] ${
                     index === colorSelect
                        ? 'border-[#891a1c]'
                        : 'border-transparent'
                  }`}>
                  <div
                     key={index}
                     className='cursor-pointer w-[40px] h-[20px]'
                     style={{backgroundColor: `${colorItem}`}}
                     onClick={() => setColorSelect(index)}></div>
               </div>
            ))}
         </div>
      </div>
   );
}
