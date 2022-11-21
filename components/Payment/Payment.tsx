import PaymentAddress from './PaymentAddress';
import PaymentMethod from './PaymentMethod';
import PaymentUserInfo from './PaymentUserInfo';

export default function Payment() {
   return (
      <div className='flex flex-col md:flex-row w-full md:w-2/3 my-4 md:my-10 mx-[auto] gap-5 '>
         {/* Cart */}
         <div className='md:w-2/3 p-2 md:p-4 bg-gray-100 rounded-lg shadow-[0_3px_8px_rgba(0,0,0,0.3)]'>
            <p className='font-bold mb-3'>
               VUI LÒNG HOÀN THÀNH THÔNG TIN ĐẶT HÀNG{' '}
            </p>

            <PaymentUserInfo />
            <PaymentMethod />
         </div>

         <div className='md:w-1/3'>
            <div className='sticky top-[80px] bg-gray-100 rounded-lg min-h-[80px] p-4 shadow-[0_3px_8px_rgba(0,0,0,0.3)]'>
               <p className='font-[700] text-[#891b1c] text-[1.3rem]'>
                  ĐƠN HÀNG CỦA BẠN
               </p>

               {/* payment bag item */}
               <table className='w-full mt-5'>
                  <thead>
                     <tr className='uppercase text-left border-b-2 border-slate-400'>
                        <th colSpan={2}>Sản phẩm</th>
                        <th className='text-right'>Tạm tính</th>
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

               <div className='flex justify-between border-b-2 border-slate-400 font-bold text-[1.3rem] mt-5'>
                  <p>Tổng</p>
                  <p>
                     <span className='text-[0.8rem]'>₫</span>
                     {(901231234).toLocaleString('en-US')}
                  </p>
               </div>
               <div className='bg-gray-700 mt-3 text-white text-center py-2 rounded-[30px] hover:bg-gray-900 hover:cursor-pointer'>
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
