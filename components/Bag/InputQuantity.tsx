import React, {useState} from 'react';

export type CounterProps = {
   min?: number;
   max?: number;
   onCountChange?: (count: number) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export default function InputQuantity({min = 1, max = 20}: CounterProps) {
   const [count, setCount] = useState(min);

   function handleClickAdd() {
      if (count < max) {
         setCount(count + 1);
         // onCountChange(count + 1);
      }
   }

   function handleClickSubtract() {
      if (count > min) {
         setCount(count - 1);
         // onCountChange(count - 1);
      }
   }

   function handleClick(e) {
      setCount(e.target.valueAsNumber);
      // onCountChange(e.target.valueAsNumber);
   }

   return (
      <div className='relative border-2 border-gray-300 md:py-[4px] rounded-[20px] text-center whitespace-nowrap overflow-hidden'>
         <button
            onClick={handleClickSubtract}
            className='absolute top-[45%] translate-y-[-50%] left-0 text-[1.2rem] font-bold pl-[10px] pr-[6px] py-4 hover:bg-gray-300'>
            -
         </button>
         <input
            className='input-quantity outline-none text-center bg-transparent text-[#ca282a] w-[40px]'
            type='number'
            min={min}
            max={max}
            value={count}
            onChange={(e: any) => setCount(e.target.value)}
         />
         <button
            onClick={handleClickAdd}
            className='absolute top-[45%] translate-y-[-50%] right-0 font-bold pr-2 pl-[6px] py-4 hover:bg-gray-300 flex justify-center items-center'>
            <span>+</span>
         </button>
      </div>
   );
}
