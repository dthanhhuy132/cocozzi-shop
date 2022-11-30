import {useState, useRef, useEffect} from 'react';

export default function PaymentMethod() {
   const [paymentMethod, setPaymentMethod] = useState('cod');
   const [imgBank, setImgBank] = useState<any>('');
   const inputRef = useRef(null);

   useEffect(() => {}, []);

   function handleClickUploadEvidenceBank() {
      inputRef.current.click();
   }

   function handleUploadImgBank(e) {
      const file = e.target.files[0];
      file.preview = URL.createObjectURL(file);
      setImgBank(file);
      e.target.value = '';
   }

   useEffect(() => URL.revokeObjectURL(imgBank.preview), []);
   return (
      <div className='transition'>
         <p className='font-bold mt-6 mb-2'>PHƯƠNG THỨC THANH TOÁN</p>

         <div>
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
               className={`h-0 overflow-hidden mt-2 transition  ${
                  paymentMethod === 'momo' && `h-[300px]`
               }`}>
               Thanh thanh toán bằng momo thì phải chuyển khoản trước nhé Thanh thanh toán bằng momo
               thì phải chuyển khoản trước nhé Thanh thanh toán bằng momo thì phải chuyển khoản
               trước nhé Thanh thanh toán bằng momo thì phải chuyển khoản trước nhé Thanh thanh toán
               bằng momo thì phải chuyển khoản trước nhé Thanh thanh toán bằng momo thì phải chuyển
               khoản trước nhé Thanh thanh toán bằng momo thì phải chuyển khoản trước nhé T
            </div>
         </div>
         <div className='mt-2 border-b-2 border-t-2 py-2 flex flex-col justify-center'>
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
                  paymentMethod === 'cod' && 'h-[30px]'
               } `}>
               Trả tiền mặt khi nhận hàng
            </div>
         </div>
         <div className='mt-2'>
            <div className='flex items-center gap-1'>
               <input
                  type='radio'
                  id='bank'
                  name='fav_language'
                  defaultValue='bank'
                  checked={paymentMethod === 'bank'}
                  onChange={(e: any) => setPaymentMethod(e.target.value)}
               />
               <label htmlFor='bank' className='cursor-pointer font-semibold'>
                  Thanh toán khi nhận hàng
               </label>
            </div>

            <div
               className={`overflow-hidden mt-2 transition-all px-4 ${
                  paymentMethod === 'bank' ? `h-full` : 'h-0'
               } `}>
               <p className='underline'>Thông tin thanh toán</p>
               <p>
                  - Số tài khoản:
                  <span className='ml-2 font-semibold'>0123134212</span>
               </p>
               <p>
                  - Chủ tài khoản:
                  <span className='ml-2 font-semibold'>Tên chủ tài khoản</span>
               </p>
               <p>
                  - Ngân hàng:
                  <span className='ml-2 font-semibold'>Vietcombank</span>
               </p>

               <div className='mt-5'>
                  <p>- Quét thẻ QR để thanh toán</p>
                  <img
                     src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'
                     className='w-[150px] h-[150px] border-2'
                     alt='qr code'
                  />
               </div>

               <div className='mt-5'>
                  <p>Upload hình ảnh chuyển khoản</p>
                  {!imgBank && (
                     <div
                        className='flex items-center justify-center w-[150px] h-[150px] border-2 rounded-lg text-[3rem] text-gray-300 cursor-pointer group'
                        onClick={handleClickUploadEvidenceBank}>
                        <span className='group-hover:text-[#891a1c] group-hover:scale-125 transition'>
                           +
                        </span>
                     </div>
                  )}
                  <div className='relative'>
                     {imgBank && <img className='' src={imgBank?.preview}></img>}
                     {imgBank && (
                        <i
                           className='absolute top-3 left-3 fa-sharp fa-solid fa-xmark text-[1.8rem] hover:scale-125 transition cursor-pointer hover:text-[#891a1c]'
                           onClick={() => setImgBank('')}
                        />
                     )}
                  </div>
                  <input
                     ref={inputRef}
                     hidden
                     type='file'
                     accept='png/jpg'
                     onChange={handleUploadImgBank}></input>
               </div>
            </div>
         </div>
      </div>
   );
}
