export default function FormatPrice({price = 0}: any) {
   return (
      <>
         <span className='text-[0.9rem] font-bold mr-1'>₫</span>
         {price.toLocaleString('en-US')}
      </>
   );
}
