import {useState} from 'react';

export default function PaymentMethod() {
   const [paymentMethod, setPaymentMethod] = useState('cod');
   return (
      <div>
         <p className='font-bold mt-6 mb-2'>PHƯƠNG THỨC THANH TOÁN</p>

         <div className='border-b-2'>
            <div className='flex items-center gap-1'>
               <input
                  type='radio'
                  id='momo'
                  name='fav_language'
                  defaultValue='momo'
                  checked={paymentMethod === 'momo'}
                  onChange={(e: any) => setPaymentMethod(e.target.value)}
               />
               <label htmlFor='momo' className='cursor-pointer font-semibold'>
                  Thanh toán qua Momo
               </label>
            </div>

            <div
               className={`overflow-hidden mt-2 transition-all ${
                  paymentMethod === 'momo' ? 'h-[200px]' : 'h-0'
               } `}>
               Thanh thanh toán bằng momo thì phải chuyển khoản trước nhé Thanh
               thanh toán bằng momo thì phải chuyển khoản trước nhé Thanh thanh
               toán bằng momo thì phải chuyển khoản trước nhé Thanh thanh toán
               bằng momo thì phải chuyển khoản trước nhé Thanh thanh toán bằng
               momo thì phải chuyển khoản trước nhé Thanh thanh toán bằng momo
               thì phải chuyển khoản trước nhé Thanh thanh toán bằng momo thì
               phải chuyển khoản trước nhé Thanh thanh toán bằng momo thì phải
               chuyển khoản trước nhé
            </div>
         </div>
         <div className='mt-2'>
            <div className='flex items-center gap-1'>
               <input
                  type='radio'
                  id='cod'
                  name='fav_language'
                  defaultValue='cod'
                  checked={paymentMethod === 'cod'}
                  onChange={(e: any) => setPaymentMethod(e.target.value)}
               />
               <label htmlFor='cod' className='cursor-pointer font-semibold'>
                  Thanh toán khi nhận hàng
               </label>
            </div>

            <div
               className={`h-0 overflow-hidden mt-2 transition-all ${
                  paymentMethod === 'cod' && 'h-[40px]'
               } `}>
               Trả tiền mặt khi nhận hàng
            </div>
         </div>
      </div>
   );
}
