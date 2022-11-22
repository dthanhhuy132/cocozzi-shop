import {useEffect, useState} from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';

export default function HeaderMarquee() {
   const exampleText = ['Cocozzi Khuyến mãi 1', 'khuyến mãi 2', ,];

   return (
      <MarqueeSC
         className='relative z-10 bg-[#891b1c] '
         speed={50}
         direction={'left'}
         pauseOnHover={'false'}>
         <h2
            className={`mx-[50px] md:mx-[200px] font-bold text-white italic `}
            onClick={() => console.log('slffasdf')}>
            Cách điệu khuyến mãi
         </h2>
         {exampleText.map((text, index) => (
            <h3
               className={`mx-[50px] md:px-[200px] text-white hover:cursor-pointer hover:bg-red-500`}
               key={index}>
               {text}
            </h3>
         ))}

         <h2 className={`mx-[50px] md:mx-[200px] underline text-white italic`}>
            Khuyến mãi 4 có gạch chân
         </h2>
      </MarqueeSC>
   );
}

const MarqueeSC = styled(Marquee)`
   padding: 2px 0px;
   overflow: hidden;
   .overlay {
      &:before {
         background: none;
      }
      &:after {
         background: none;
      }
   }
`;
