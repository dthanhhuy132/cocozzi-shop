import PaymentAddress from './PaymentAddress';
import PaymetnInputForm from './PaymentInputForm';

export default function PaymentUserInfo() {
   return (
      <>
         <div className='grid grid-cols-1 md:grid-cols-2 md:gap-5'>
            <PaymetnInputForm label='Tên *' placeHolder='Vui lòng nhập tên' />
            <PaymetnInputForm label='Họ *' placeHolder='Vui lòng nhập họ' />
            <PaymetnInputForm
               label='Số điện thoại *'
               placeHolder='Vui lòng nhập số điện thoại'
            />
            <PaymetnInputForm
               label='Email *'
               placeHolder='Vui lòng nhập email'
            />
         </div>
         <div>
            <p className='font-bold mt-6 mb-2 underline'>Địa chỉ nhận hàng</p>
            <PaymentAddress />
         </div>
      </>
   );
}
