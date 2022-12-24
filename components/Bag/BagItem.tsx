import Image, {StaticImageData} from 'next/image';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import FormatPrice from '../../helper/FormatPrice';
import uppercaseFirstLetter from '../../helper/uppercaseFirstLetter';
import useWindowDimensions from '../../hooks/UseWindowDimensions';
import InputQuantity from './InputQuantity';

interface IBagItem {
   img: StaticImageData;
   // key: number;
}

function deleteCartItem() {}

function updateCartItem() {}

export default function BagItem({productCart}) {
   const {isMobile} = useWindowDimensions();

   return (
      <>
         <tr>
            <td className='border-b pb-3 border-black '>
               <div className='flex gap-2 items-center'>
                  <span>
                     <AiOutlineCloseCircle className='text-[1.3rem] text-gray-400 hover:cursor-pointer hover:text-gray-900' />
                  </span>
                  <img
                     src={productCart?.product?.pictures[0]}
                     alt=''
                     className='w-[80px] rounded-md'
                  />
                  <div className={`${isMobile && 'flex flex-col flex-1 gap-1'}`}>
                     <div className='text-[0.9rem] '>
                        {/* name */}
                        <p className='whitespace-pre-line'>
                           {uppercaseFirstLetter(productCart?.product.name)}
                        </p>
                        {/* product color + size */}
                        <div className='flex gap-5'>
                           <div className='flex gap-2 items-center'>
                              <span>Size: </span>
                              <span>{productCart?.product?.size}</span>
                           </div>
                           <div className='flex gap-2 items-center'>
                              <span>Color: </span>{' '}
                              <div
                                 className='w-[30px] h-[16px]'
                                 style={{backgroundColor: productCart.productSelectColor}}></div>
                           </div>
                        </div>
                     </div>
                     <div
                        className={`${
                           !isMobile && 'hidden'
                        } flex items-center justify-between gap-2`}>
                        <p className='flex items-start'>
                           <span className='mr-1'>2 x </span>
                           <FormatPrice price={productCart?.product?.price} />
                        </p>
                        <div className='w-[35%]'>
                           <InputQuantity value={productCart?.product?.quantity}></InputQuantity>
                        </div>
                     </div>
                  </div>
               </div>
            </td>
            <td className={`${isMobile && 'hidden'} px-5 font-bold border-b pb-3 border-black`}>
               <FormatPrice price={Number(productCart?.product?.price)} />
            </td>
            <td className={`${isMobile && 'hidden'} px-5 border-b pb-3 border-black`}>
               <InputQuantity value={productCart?.product?.quantity} />
            </td>
            <td className={`${isMobile && 'hidden'} px-5 font-bold border-b pb-3 border-black`}>
               <FormatPrice
                  price={Number(productCart?.product?.price * productCart?.product?.quantity)}
               />
            </td>
         </tr>
      </>
   );
}
