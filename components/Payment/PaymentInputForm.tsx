interface IPaymentInputForm {
   label: string;
   placeHolder: string;
}

export default function PaymetnInputForm({
   label,
   placeHolder,
}: IPaymentInputForm) {
   return (
      <div className='flex flex-col gap-2'>
         <label className='font-[500]'>{label}</label>
         <input
            type='text'
            className='ring-1 ring-gray-300 py-[6px] px-2 rounded-[4px] outline-blue-500'
            placeholder={placeHolder}
         />
      </div>
   );
}
