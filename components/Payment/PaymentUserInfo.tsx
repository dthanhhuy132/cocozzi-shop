import PaymentAddress from './PaymentAddress';
import PaymetnInputForm from './PaymentInputForm';

export default function PaymentUserInfo({userInfo}) {
   return (
      <>
         <div className='grid grid-cols-1 md:grid-cols-2 md:gap-5'>
            <PaymetnInputForm label='Tên *' placeHolder='Tên của bạn' />
            <PaymetnInputForm label='Họ *' placeHolder='Họ của bạn' />
            <PaymetnInputForm label='Số điện thoại *' placeHolder='Nhập số điện thoại' />
            <PaymetnInputForm label='Email *' placeHolder='Nhập email' />
         </div>
         <div>
            <p className='font-bold mt-6 mb-2 underline'>Địa chỉ nhận hàng</p>
            <PaymentAddress />
         </div>
      </>
   );
}
