export default function UserHeaderControl() {
   return (
      <div className='absolute top-7 right-[-10px] min-w-[150px] bg-white border rounded-lg shadow-[0_3px_8px_rgba(0,0,0,0.3)]'>
         <ul className='capitalize py-1'>
            <li className='py-1 px-2 hover:bg-[#891b1c] hover:text-white cursor-pointer'>
               Thông tin
            </li>
            <li className='py-1 px-2 hover:bg-[#891b1c] hover:text-white cursor-pointer'>
               Đơn hàng của tôi
            </li>

            <li className='py-1 px-2 hover:bg-[#891b1c] hover:text-white cursor-pointer'>
               Trang Admin
            </li>
            <li className='py-1 px-2 hover:bg-[#891b1c] hover:text-white cursor-pointer'>
               Đăng xuất
            </li>

            <li className='py-1 px-2 hover:bg-[#891b1c] hover:text-white cursor-pointer'>
               Đăng nhập
            </li>
         </ul>
      </div>
   );
}
