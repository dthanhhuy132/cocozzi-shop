import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';
import {BagHeader, BagItem} from './index';
import {updateCart} from '../../store/cart/cartSlice';

export default function Bag({carts}) {
   const router = useRouter();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(updateCart(carts));
   }, []);

   return (
      <div className='flex flex-col md:flex-row w-full md:w-2/3 my-4 md:my-10 mx-[auto] gap-5 '>
         {/* Cart */}
         <div className='md:w-2/3 p-2 md:p-4 bg-gray-100 rounded-lg shadow-[0_3px_8px_rgba(0,0,0,0.3)]'>
            <table className='w-full border-separate border-spacing-y-[10px]'>
               <thead className='font-thin text-[0.95rem]'>
                  <BagHeader />
               </thead>
               <tbody className='p-2'>
                  <BagItem />
                  <BagItem />
                  <BagItem />
                  <BagItem />
               </tbody>
            </table>
         </div>

         <div className='md:w-1/3'>
            <div className='sticky top-[80px] bg-gray-100 rounded-lg min-h-[80px] p-4 shadow-[0_3px_8px_rgba(0,0,0,0.3)]'>
               <div className='flex justify-between border-b-2 border-slate-400 font-bold text-[1.3rem]'>
                  <p>Tổng</p>
                  <p>
                     <span className='pr-1'>₫</span>
                     {(901231234).toLocaleString('en-US')}
                  </p>
               </div>
               <div className='bg-gray-700 mt-3 text-white text-center py-2 rounded-[30px] hover:bg-gray-900 hover:cursor-pointer'>
                  <p
                     className='font-bold'
                     onClick={() => router.push('/payment')}>
                     Tiến hành thanh toán
                  </p>
               </div>
            </div>
         </div>
         {/* payment */}
      </div>
   );
}
