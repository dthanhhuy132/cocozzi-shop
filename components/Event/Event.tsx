import styled from 'styled-components';
import Image from 'next/image';

import bannerImg from '../../public/images/promo/basquiat_tn.jpg';
import infoImg from '../../public/images/shop/18.webp';
export default function Event() {
   return (
      <>
         <div className='relative'>
            <Image
               src={bannerImg}
               layout='responsive'
               objectFit='contain'
            ></Image>
            <div className='absolute left-[20px] bottom-[-150px] h-[200px] w-[150px] rounded-lg overflow-hidden md:left-[40px] md:bottom-[-500px] md:w-[30%] md:h-[600px] lg:left-[60px] lg:bottom-[-400px] lg:w-[33%] lg:h-[600px]'>
               <Image
                  src={infoImg}
                  // layout='fill'
                  objectFit='contain'
                  className='rounded-lg'
               ></Image>
            </div>
         </div>
         <div className='flex flex-col items-center justify-center py-10 pl-[40%] font md:py-[100px] lg:py-[200px]'>
            <p className='font-bold'>Text title</p>
            <p>Text content</p>
         </div>
      </>
   );
}
