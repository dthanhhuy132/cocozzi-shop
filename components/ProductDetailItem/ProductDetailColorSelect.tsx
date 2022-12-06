import React from 'react';

const COLOR = ['#8b7053', '#891a1c', '#ff0000', '#3b3533', '#657b33'];

export default function ProductDetailColorSelect({colorSelect, setColorSelect}) {
   return (
      <div className='flex items-center gap-1 mx-3 md:mx-0 mt-2 md:mt-5 pb-2 border-b-[1px] md:pb-5'>
         <p className='text min-w-[70px]'>Color: </p>
         <div className='flex justify-between w-full'>
            {COLOR.map((colorItem, index) => (
               <div
                  key={index}
                  className='cursor-pointer w-[40px] h-[20px]'
                  style={{backgroundColor: `${colorItem}`}}
                  onClick={() => setColorSelect(index)}
               />
            ))}
         </div>
      </div>
   );
}
