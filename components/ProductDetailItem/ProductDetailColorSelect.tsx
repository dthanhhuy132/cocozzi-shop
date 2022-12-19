import {useEffect} from 'react';

export default function ProductDetailColorSelect({colorList, colorSelect, setColorSelect}) {
   useEffect(() => {}, []);
   return (
      <div className='flex items-center gap-1 mx-3 md:mx-0 mt-2 md:mt-5 pb-2 border-b-[1px] md:pb-5'>
         <p className='text min-w-[70px]'>Color: </p>
         <div className='flex flex-row gap-4 items-center w-full'>
            {colorList
               .toString()
               .split(',')
               .map((colorItem, index) => (
                  <div
                     key={index}
                     className='cursor-pointer w-[40px] h-[24px]'
                     style={{
                        backgroundColor: `${colorItem}`,
                        border: colorSelect === colorItem ? '2px solid red' : 'none',
                        padding: colorSelect === colorItem ? '5px' : 'none',
                     }}
                     onClick={() => setColorSelect(colorItem)}
                  />
               ))}
         </div>
      </div>
   );
}
