import useWindowDimensions from '../../hooks/UseWindowDimensions';

export default function BagHeader() {
   const {isMobile} = useWindowDimensions();
   return (
      <tr className='uppercase'>
         <th className='text-left border-b-[2px] border-slate-400'>Sản phẩm</th>
         <th
            className={`${
               isMobile && 'hidden'
            } text-left border-b-[2px] border-slate-400 px-5`}>
            Giá
         </th>
         <th
            className={`${
               isMobile && 'hidden'
            } text-left border-b-[2px] border-slate-400 px-5 whitespace-nowrap`}>
            Số lượng
         </th>
         <th
            className={`${
               isMobile && 'hidden'
            } text-left border-b-[2px] border-slate-400 px-5 whitespace-nowrap`}>
            Tạm tính
         </th>
      </tr>
   );
}
