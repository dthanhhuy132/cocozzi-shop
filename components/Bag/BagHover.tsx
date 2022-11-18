import styled from 'styled-components';
import img1 from '../../public/images/shop/1.webp';
import img2 from '../../public/images/shop/2.webp';
import img3 from '../../public/images/shop/3.webp';
import img4 from '../../public/images/shop/4.webp';
import BagItemHover from './BagItemHover';

const imgArr = [img1, img2, img3, img4];

export default function BagHover() {
   return (
      <DivSC>
         <div className='relative flex flex-col justify-end z-10 p-4'>
            <p className='border-b-2 lowercase mb-2 font-thin pb-2'>
               shopping bag
            </p>
            {/* cart */}
            <div className='flex flex-col gap-2 my-2 max-h-[170px] overflow-auto'>
               {imgArr.map((img, index) => (
                  // add img here
                  <BagItemHover key={index} />
               ))}
            </div>

            <div className='border-t-2 mt-2 lowercase text-center'>
               <div className='flex justify-between font-thin mt-1'>
                  <p>Total</p>
                  <p>3 000 000</p>
               </div>
               <p className='w-[50%] font-bold bg-[white] text-black rounded-[30px] pb-1 mx-[auto] mt-2'>
                  pay
               </p>
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
   background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqCFRTme51rLB8j3KW3MdM7CUn9LSMQOrmcg&usqp=CAU');
   object-fit: cover;
   /* background-repeat: no-repeat; */
   z-index: 1;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;

   width: 100%;
   height: 100%;

   filter: brightness(0.25);
`;