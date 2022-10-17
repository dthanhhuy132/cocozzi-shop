import {Slider} from '../Slider';
import img1 from '../../public/images/shop/1.webp';
import img2 from '../../public/images/shop/2.webp';
import img3 from '../../public/images/shop/3.webp';
import img4 from '../../public/images/shop/4.webp';
import img5 from '../../public/images/shop/5.webp';
import img6 from '../../public/images/shop/6.webp';
import img7 from '../../public/images/shop/7.webp';
import img8 from '../../public/images/shop/8.webp';
import {useEffect, useState} from 'react';
import Image from 'next/image';

const imgArr = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function Shop() {
   return (
      // slider for pc and tablet
      <>
         <div className='hidden md:block w-[80%] mt-10'>
            <Slider imgArr={imgArr}></Slider>
            <div className='my-10 border-b-2 border-black'></div>
            <Slider imgArr={imgArr}></Slider>
         </div>

         <div className='md:hidden'>
            {imgArr.map((img, index) => (
               <div
                  key={index}
                  className='uppercase hover:cursor-pointer mb-10'
               >
                  <div>
                     <Image src={img} alt='' />
                  </div>
                  <div className='px-3'>
                     <div className='flex justify-between'>
                        <h3>Product name</h3>
                        <div>Them vao gio hang</div>
                     </div>
                     <p>$50</p>
                  </div>
               </div>
            ))}
         </div>
      </>
   );
}
