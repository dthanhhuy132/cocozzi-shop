import {useMemo} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

const adminRouter = ['order', 'home', 'promo', 'category', 'event', 'product', 'user', 'info'];

export default function AdminSideBar() {
   const router = useRouter();
   const currentRoute = router.pathname;

   return (
      <aside className='w-64 fixed'>
         <div className='overflow-y-auto bg-[#f3f4f6] min-h-[100vh]'>
            <ul className=''>
               {adminRouter.map((adminRoute, index) => (
                  <Link href={`/admin/${adminRoute}`} key={index}>
                     <li
                        className={`flex items-center py-4 pl-2 hover:bg-gray-700 hover:text-[white] capitalize cursor-pointer ${
                           currentRoute.indexOf(adminRoute) >= 0 && 'bg-gray-900 text-white'
                        }`}>
                        <span className='ml-3'>{adminRoute}</span>
                     </li>
                  </Link>
               ))}
            </ul>
         </div>
      </aside>
   );
}
