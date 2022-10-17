import {useEffect, useState} from 'react';
import Marquee from 'react-fast-marquee';
import styled from 'styled-components';

export default function HeaderMarquee() {
   const exampleText = ['gà Tuấn', 'Bò Tuấn', 'Tuấn khỉ', 'Tuấn mượt'];

   return (
      <MarqueeSC className='bg-[#891b1c]' speed={50} direction={'right'}>
         <h1
            className={`mx-[50px] md:mx-[200px] font-bold text-white font-italic`}
         >
            Cho cai khac
         </h1>
         {exampleText.map((text, index) => (
            <h1 className={`mx-[50px] md:mx-[200px] text-white`} key={index}>
               {text}
            </h1>
         ))}
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
