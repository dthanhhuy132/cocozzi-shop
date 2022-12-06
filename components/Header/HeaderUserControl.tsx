import Link from 'next/link';
import {useSelector} from 'react-redux';
import isAdmin from '../../helper/isAdmin';

export default function HeaderUserControl({hasToken, isMobile}) {
   const {user} = useSelector((state: any) => state.auth);

   return (
      <div className='absolute top-7 right-[-10px] min-w-[190px] bg-white border rounded-lg shadow-[0_3px_8px_rgba(0,0,0,0.3)]'>
         <ul className='capitalize py-1'>
            {hasToken && (
               <>
                  <li className='py-1 px-2 hover:bg-[#891a1c] hover:text-white cursor-pointer'>
                     Thông tin
                  </li>
                  <li className='py-1 px-2 hover:bg-[#891a1c] hover:text-white cursor-pointer'>
                     Đơn hàng của tôi
                  </li>

                  {isAdmin(user) && (
                     <li className='py-1 px-2 hover:bg-[#891a1c] hover:text-white cursor-pointer'>
                        <Link href='/admin/home'>
                           <a>Trang Admin</a>
                        </Link>
                     </li>
                  )}
                  <li className='py-1 px-2 hover:bg-[#891a1c] hover:text-white cursor-pointer'>
                     Đăng xuất
                  </li>
               </>
            )}

            {!hasToken && (
               <li className='py-1 px-2 hover:bg-[#891a1c] hover:text-white cursor-pointer'>
                  Đăng nhập
               </li>
            )}
         </ul>
      </div>
   );
}
