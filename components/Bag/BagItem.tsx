import Image, {StaticImageData} from 'next/image';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import useWindowDimensions from '../../hooks/UseWindowDimensions';
import InputQuantity from './InputQuantity';

interface IBagItem {
   img: StaticImageData;
   // key: number;
}

export default function BagItem() {
   const {isMobile} = useWindowDimensions();

   return (
      <tr>
         <td className='border-b pb-3 border-slate-300 '>
            <div className='flex gap-2 items-center'>
               <span>
                  <AiOutlineCloseCircle className='text-[1.3rem] text-gray-400 hover:cursor-pointer hover:text-gray-900' />
               </span>
               <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQLG2aQbb_A6E3JwO29d76XyJRbxWIo6nUqhe-93DDIr7g4u96ZMVBLybnsxzOd3pJCQ0&usqp=CAU'
                  alt=''
                  className='w-[80px] rounded-md'
               />
               <div className={`${isMobile && 'flex flex-col flex-1 gap-1'}`}>
                  <p className='text-[0.9rem]'>
                     day la ten san pha fasdf asdfm
                  </p>
                  <div
                     className={`${
                        !isMobile && 'hidden'
                     } flex items-center justify-between gap-2`}>
                     <p className='flex items-start'>
                        <span className='mr-1'>2 x </span>
                        <span>₫</span>
                        <span className='font-bold'>
                           {(50000).toLocaleString('en-US')}
                        </span>
                     </p>
                     <div className='w-[35%]'>
                        <InputQuantity></InputQuantity>
                     </div>
                  </div>
               </div>
            </div>
         </td>
         <td
            className={`${
               isMobile && 'hidden'
            } px-5 font-bold border-b pb-3 border-slate-300`}>
            <p className='flex items-start'>
               <span>₫</span>
               {(50000).toLocaleString('en-US')}
            </p>
         </td>
         <td
            className={`${
               isMobile && 'hidden'
            } px-5 border-b pb-3 border-slate-300`}>
            <InputQuantity></InputQuantity>
         </td>
         <td
            className={`${
               isMobile && 'hidden'
            } px-5 font-bold border-b pb-3 border-slate-300`}>
            <p className='flex items-start'>
               <span>₫</span>
               {(5000).toLocaleString('en-US')}
            </p>
         </td>
      </tr>
   );
}
