import {useState} from 'react';
import Cookies from 'js-cookie';

import moment from 'moment';
import {GrFormClose} from 'react-icons/gr';
import {MdOutlineDone} from 'react-icons/md';
import FormatPrice from '../../helper/FormatPrice';
import ProductOrderItem from './ProductOrderItem';
import {deletePaymentAsync, updatePaymentByIdAsync} from '../../store/payment/paymentAsynAction';
import {useAppDispatch} from '../../store';
import {parseJwt} from '../../helper';
import LoadingCocozzi from '../common/LoadingCocozzi';
import {toast} from 'react-toastify';

export default function ProductOrder({payment, index}) {
   const voucher =
      payment?.listProduct?.reduce(
         (acc, cur) => (acc += cur?.product.quantity * cur?.product.price),
         0
      ) +
      payment.totalShip -
      payment.totalMoney;
   const dispatch = useAppDispatch();
   const accessToken = Cookies.get('accessToken');
   const userInfo = parseJwt(accessToken)?.data;
   const [isShowModalConfirmDelete, setIsShowModalConfirmDelete] = useState(false);
   const [isShowLoading, setIsShowLoading] = useState(false);

   function deletePayment(paymentId) {
      setIsShowLoading(true);
      console.log('paymentId', paymentId);
      console.log('userInfo', userInfo._id);

      const deleteData = {
         userId: userInfo._id,
         orderStatus: 'cancel',
      };
      dispatch(
         updatePaymentByIdAsync({accessToken, paymentId, paymentUpdateData: deleteData})
      ).then((res) => {
         if (res.payload.ok) {
            setIsShowModalConfirmDelete(false);
         } else {
            toast.warning('Có lỗi !!!');
         }
         setIsShowLoading(false);
      });
   }

   return (
      <div className='border-b-2' key={payment._id}>
         <div className='flex justify-between'>
            <h2 className='font-bold underline  text-[1.5rem] '>
               <span className='font-extrabold'># </span>Đơn hàng số {index + 1}
            </h2>
            <div className='relative'>
               <button
                  disabled={payment.orderStatus === 'cancel'}
                  className='text-white bg-red-700 hover:bg-red-600 px-2 py-1 rounded-lg disabled:bg-gray-300'
                  onClick={() => setIsShowModalConfirmDelete(true)}>
                  Hủy đơn
               </button>
               {/* modal confirm delete */}
               {isShowModalConfirmDelete && (
                  <>
                     <div className='fixed bg-black bg-opacity-75 inset-0 z-[49]'></div>
                     <div
                        className='absolute top-[100%] right-0 z-[200] bg-black bg-opacity-50 p-2 rounded-lg 
            
         '>
                        <p className='text-white text-[0.9rem] mb-2 text-center'>Xóa sản phẩm?</p>
                        <div className='flex gap-2'>
                           <div
                              className='py-1 px-4 text-[1.5rem] bg-green-600 hover:bg-green-400 text-white rounded-lg cursor-pointer'
                              onClick={() => deletePayment(payment._id)}>
                              <MdOutlineDone />
                           </div>
                           <div
                              className='py-1 px-4 text-[1.5rem] bg-red-600 hover:bg-red-400 text-white rounded-lg cursor-pointer'
                              onClick={() => setIsShowModalConfirmDelete(false)}>
                              <GrFormClose />
                           </div>
                        </div>
                     </div>
                  </>
               )}
            </div>
         </div>
         {/* payment info */}
         <div className='border-b-2 mb-2 pb-2'>
            <div className=''>
               <span>- Ngày tạo đơn:</span>
               <span className='ml-2 font-semibold'>
                  {moment(payment.createdAt).format(' HH:mm DD/MM/YYYY')}
               </span>
            </div>
            <div className=''>
               <span>- Địa chỉ nhận hàng:</span>
               <span className='ml-2 font-semibold'>{payment.address}</span>
            </div>
            <div className=''>
               <span>- Thông tin người nhận hàng:</span>
               <span className='ml-2 font-semibold'>{payment.note}</span>
            </div>

            <div className=''>
               <span>- Trạng thái đơn hàng:</span>
               <span
                  className={`ml-2 font-semibold px-2 py-[2px] rounded-xl text-white
                  ${payment.orderStatus === 'cancel' && 'bg-red-600'}
                  ${payment.orderStatus === 'await' && 'bg-blue-800'}
                  ${payment.orderStatus === 'success' && 'bg-green-600'}
                  
                  `}>
                  {payment.orderStatus}
               </span>
            </div>

            <div className=''>
               <span>- Hình thức thanh toán:</span>
               <span className='ml-2 font-semibold'>
                  {payment.paymentMethods === 'COD'
                     ? 'Thanh toán khi nhận hàng'
                     : 'Thanh toán qua ngân hàng'}
               </span>
            </div>
         </div>

         <div className='flex flex-col gap-3 pb-2 border-b-2'>
            {payment?.listProduct?.map((productOrder, index) => (
               <ProductOrderItem key={index} productOrder={productOrder} />
            ))}
         </div>

         <div className='border-b-4 mt-2 pb-2 border-black'>
            <div className='flex justify-between'>
               <span>Phí vận chuyển:</span>
               <span className='ml-2 font-semibold'>
                  <FormatPrice price={payment.totalShip} />
               </span>
            </div>
            <div className='flex justify-between'>
               <span> Mã giảm giá</span>
               <span className='ml-2 font-semibold text-[#891a1c]'>
                  -<FormatPrice price={voucher} />
               </span>
            </div>

            <div className='flex justify-between'>
               <span> Tổng đơn hàng</span>
               <p className='ml-2 font-semibold font-[1.5rem]'>
                  <FormatPrice fontSize='1.2rem' price={payment.totalMoney} />
               </p>
            </div>
         </div>
         {isShowLoading && <LoadingCocozzi />}
      </div>
   );
}
