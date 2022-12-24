import {useRouter} from 'next/router';
import Cookies from 'js-cookie';
import {useEffect} from 'react';
import {toast} from 'react-toastify';

import PaymentAddress from './PaymentAddress';
import PaymentMethod from './PaymentMethod';
import PaymentUserInfo from './PaymentUserInfo';

export default function Payment() {
   const router = useRouter();
   const product = router.query;

   // const dataPayment = {};
   console.log('product co gi trong payment', product);

   const accessToken = Cookies.get('accessToken');
   useEffect(() => {
      if (!accessToken) {
         router.push('/membership');
         toast.warning('Vui lòng đăng nhập để tiế hành thanh toán đơn hàng');
      }
   }, []);
   return (
      <div className='flex flex-col md:flex-row w-full md:w-2/3 my-4 md:my-10 mx-[auto] gap-5 '>
         {/* Cart */}
         <div className='md:w-2/3 p-2 md:p-4 bg-gray-100 rounded-lg  '>
            <p className='font-bold mb-3'>VUI LÒNG HOÀN THÀNH THÔNG TIN ĐẶT HÀNG </p>

            <PaymentUserInfo />
            <PaymentMethod />
         </div>

         <div className='md:w-1/3'>
            <div className='sticky top-[80px] bg-gray-100 rounded-lg min-h-[80px] p-4  '>
               <p className='font-[700] text-[#891a1c] text-[1.3rem]'>ĐƠN HÀNG CỦA BẠN</p>

               {/* payment bag item */}
               <table className='w-full mt-5'>
                  <thead>
                     <tr className='uppercase text-left border-b-2 border-slate-400'>
                        <th colSpan={2}>
                           <span className='font-[900]'>Sản phẩm</span>
                        </th>
                        <th className='text-right'>
                           <span className='font-[900]'>Tạm tính</span>
                        </th>
                     </tr>
                  </thead>

                  <tbody>
                     <tr className='border-b-[1px] border-slate-300 '>
                        <td colSpan={2} className='py-1'>
                           <span>Tên sản phẩm</span>
                           <span> x 3</span>
                        </td>

                        <td className='text-right'>
                           <span className='text-[0.8rem] font-bold'>₫</span>
                           {(901234).toLocaleString('en-US')}
                        </td>
                     </tr>

                     <tr className='border-b-[1px] border-slate-300 '>
                        <td colSpan={2} className='py-1'>
                           <span>Tên sản phẩm</span>
                           <span> x 3</span>
                        </td>

                        <td className='text-right'>
                           <span className='text-[0.8rem] font-bold'>₫</span>
                           {(901234).toLocaleString('en-US')}
                        </td>
                     </tr>

                     <tr className='border-b-[1px] border-slate-300 '>
                        <td colSpan={2} className='py-1'>
                           <span>Tên sản phẩm</span>
                           <span> x 3</span>
                        </td>

                        <td className='text-right'>
                           <span className='text-[0.8rem] font-bold'>₫</span>
                           {(901234).toLocaleString('en-US')}
                        </td>
                     </tr>
                  </tbody>
               </table>

               <div className='flex justify-between mt-4 border-b-[1px] border-slate-400 pb-1'>
                  <p className='font-bold'>Phí giao hàng</p>
                  <p>
                     <span className='text-[0.8rem] font-bold'>₫</span>
                     {(10000).toLocaleString('en-US')}
                  </p>
               </div>

               <div className='flex flex-col justify-between mt-4 border-b-[1px] border-slate-400 pb-1'>
                  <div className='flex justify-between'>
                     <p className='font-bold'>Voucher</p>
                     <p className='font-extrabold text-[#891a1c]'>
                        <span className='text-[0.8rem]'>-₫</span>
                        {(10000).toLocaleString('en-US')}
                     </p>
                  </div>
                  <div className='relative w-full my-2'>
                     <input
                        type='text'
                        className='p-2 w-full rounded-lg outline-none'
                        placeholder='Mã giảm giá'
                     />
                     <button className='absolute right-0 top-0 h-full px-4 border-[1px] rounded-lg bg-gray-300'>
                        Áp dụng
                     </button>
                  </div>
               </div>

               <div className='flex justify-between border-b-2 border-slate-400 font-bold text-[1.3rem] mt-5'>
                  <p>Tổng</p>
                  <p>
                     <span className='text-[0.8rem]'>₫</span>
                     {(901231234).toLocaleString('en-US')}
                  </p>
               </div>
               <div className='bg-black mt-3 text-white text-center py-2 rounded-[30px] hover:bg-gray-900 hover:cursor-pointer'>
                  <p className='font-bold' onClick={() => {}}>
                     Đặt hàng
                  </p>
               </div>
            </div>
         </div>
         {/* payment */}
      </div>
   );
}
