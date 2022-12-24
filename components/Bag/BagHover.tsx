import Link from 'next/link';
import styled from 'styled-components';

export default function BagHover() {
   return (
      <DivSC>
         <div className='relative flex flex-col justify-end z-10 p-4'>
            <p className='border-b-2 lowercase mb-2 font-thin pb-2'>shopping bag</p>
            {/* cart */}
            <div className='flex flex-col gap-4 my-2 max-h-[170px] overflow-auto'>
               {/* {imgArr.map((img, index) => (
                  // add img here
                  <BagItemHover key={index} />
               ))} */}
            </div>

            <div className='border-t-2 mt-2 lowercase text-center'>
               <div className='flex justify-between font-thin mt-1'>
                  <p>Total</p>
                  <p>3 000 000</p>
               </div>
               <Link href={'/payment'}>
                  <p className='w-[50%] font-bold bg-[white] text-black rounded-[30px] pb-1 mx-[auto] mt-2 cursor-pointer'>
                     pay
                  </p>
               </Link>
            </div>
         </div>
         <DivSCBackground></DivSCBackground>
      </DivSC>
   );
}

const DivSC = styled('div')`
   position: absolute;
   top: 30px;
   right: 0;

   width: 350px;
   min-height: 320px;

   border-radius: 5px;

   color: white;

   cursor: default;

   &:after {
      content: '';
      position: absolute;
      top: -12px;
      right: 4px;
      border-width: 6px;
      border-style: solid;
      border-color: transparent transparent black transparent;
      filter: unset;
   }

   &:before {
      content: '';
      position: absolute;
      top: -7px;
      left: 0;
      width: 100%;
      height: 30px;

      background-color: transparent;
   }
`;

const DivSCBackground = styled(DivSC)`
   /* background-image: url('https://images.pond5.com/shopping-cart-background-presentation-footage-075835137_prevstill.jpeg'); */

   /* background-size: cover; */
   /* background-repeat: no-repeat; */
   z-index: 1;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;

   width: 100%;
   height: 100%;

   background-color: #3b3333;
   opacity: 0.6;

   /* filter: brightness(0.25); */
`;
