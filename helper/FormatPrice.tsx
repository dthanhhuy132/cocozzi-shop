export default function FormatPrice({price = 0}: any) {
   return (
      <>
         <span className='text-[0.8rem] font-bold'>₫</span>
         {price.toLocaleString('en-US')}
      </>
   );
}
