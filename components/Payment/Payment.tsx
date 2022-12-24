import {useRouter} from 'next/router';
import Cookies from 'js-cookie';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';

import PaymentAddress from './PaymentAddress';
import PaymentMethod from './PaymentMethod';
import PaymentUserInfo from './PaymentUserInfo';

import {parseJwt} from '../../helper';
import useGlobalState from '../../state';
import FormatPrice from '../../helper/FormatPrice';
import uppercaseFirstLetter from '../../helper/uppercaseFirstLetter';
import PaymentTableHeader from './PaymentHeader';

export default function Payment() {
   const accessToken = Cookies.get('accessToken');
   const userInfo = parseJwt(accessToken)?.data;

   const router = useRouter();
   const productBuyNow = router.query;

   const [paymentProduct, setPaymentProduct] = useState(
      Object.keys(productBuyNow).length > 0 ? [productBuyNow] : null
   );

   // const dataPayment = {};

   console.log('paymentProduct co gi trong payment', paymentProduct);
   console.log('userInfo co gi trong payment', userInfo);

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

            <PaymentUserInfo userInfo={userInfo} />
            <PaymentMethod userInfo={userInfo} />
         </div>

         <div className='md:w-1/3'>
            <div className='sticky top-[80px] bg-gray-100 rounded-lg min-h-[80px] p-4  '>
               <p className='font-[700] text-[#891a1c] text-[1.3rem]'>ĐƠN HÀNG CỦA BẠN</p>

               {/* payment bag item */}
               <table className='w-full mt-5'>
                  <PaymentTableHeader />
                  {/* payment body */}
                  <tbody>
                     {paymentProduct && paymentProduct.length > 0 ? (
                        paymentProduct.map((product, index) => (
                           <tr className='border-b-[1px] border-slate-300' key={index}>
                              <td colSpan={2} className='py-1'>
                                 <div>
                                    <div>
                                       <span className='font-bold'>
                                          {uppercaseFirstLetter(product?.name)}
                                       </span>
                                       <span> {product ? 'x 1' : 'so khac'}</span>
                                    </div>
                                    <div className='flex gap-5'>
                                       <span>
                                          <span className='font-bold'>Size:</span> {product?.size}
                                       </span>
                                       <div className='flex gap-2'>
                                          <span className='font-bold'>Color:</span>
                                          <div
                                             className='w-[40px] h-[20px]'
                                             style={{
                                                backgroundColor: `${product?.colorSelect}`,
                                             }}></div>
                                       </div>
                                    </div>
                                 </div>
                              </td>

                              <td className='text-right flex items-end justify-end mt-[4px]'>
                                 <FormatPrice price={Number(productBuyNow.price)} />
                              </td>
                           </tr>
                        ))
                     ) : (
                        <p>Không có sản phẩm nào</p>
                     )}
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
