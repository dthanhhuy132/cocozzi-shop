import {useEffect} from 'react';

export default function ProductDetailColorSelect({colorList, colorSelect, setColorSelect}) {
   useEffect(() => {}, []);
   return (
      <div className='flex items-center gap-1 mx-3 md:mx-0 mt-2 md:mt-5 pb-2 border-b-[1px] md:pb-5'>
         <p className='text min-w-[70px]'>Color: </p>
         <div className='flex flex-row items-center w-full'>
            {colorList
               .toString()
               .split(',')
               .map((colorItem, index) => (
                  <div
                     style={{
                        padding: '2px',
                        border: colorSelect === colorItem ? '2px solid red' : 'none',
                     }}
                     key={index}>
                     <div
                        key={index}
                        className='cursor-pointer w-[40px] h-[20px]'
                        style={{
                           backgroundColor: `${colorItem}`,
                        }}
                        onClick={() => setColorSelect(colorItem)}
                     />
                  </div>
               ))}
         </div>
      </div>
   );
}
