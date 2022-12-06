import {useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import HeaderSearch from './HeaderSearch';

interface IHeaderNavRps {
   handleCloseMenu: () => void;
   isShowMenuRps: Boolean;
}

const navbarHeader = ['shop', 'promo', 'event', 'info', 'membership'];
const navbarHasToken = ['Thông tin', 'Trang Admin', 'Đăng xuất'];
export default function HeaderNavResponsive({handleCloseMenu, isShowMenuRps}: IHeaderNavRps) {
   const router = useRouter();

   const {user} = useSelector((state: any) => state.auth);

   function handleClickNavItem(e: any, item: string) {
      e.preventDefault();
      handleCloseMenu();
      router.push(`/${item}`);
   }

   useEffect(() => {
      handleCloseMenu();
   }, [router.asPath]);

   // animate__animated animate__faster
   // isShowMenuRps ? 'animate__fadeInLeft' : 'animate__fadeOutLeft'
   return (
      <>
         <div
            className={`${
               isShowMenuRps ? 'left-0' : 'left-[-100%]'
            } fixed top-0 bottom-0 w-full bg-black bg-opacity-90 z-50 pt-[100px] text-center text-white transition-all duration-300`}>
            <i
               className='absolute top-3 left-3 fa-sharp fa-solid fa-xmark text-[1.8rem]'
               onClick={() => handleCloseMenu()}
            />

            <div className='flex justify-center'>
               <HeaderSearch whiteLine={true} />
            </div>

            {/* nav bar */}
            <ul className='flex justify-center gap-x-4 gap-y-3 uppercase flex-col mt-5'>
               {navbarHeader.map((item) => (
                  <a
                     key={item}
                     className={`hover:text-[#891a1c] font-[500] text-[1.1rem] `}
                     onClick={(e) => handleClickNavItem(e, item)}>
                     {item}
                  </a>
               ))}
               <div className='my-2 relative before:absolute before:top-0 before:left-[50%] before:translate-x-[-50%] before:w-[40px] before:h-[2px] before:bg-gray-300'></div>
               {navbarHasToken.map((item) => (
                  <a
                     key={item}
                     className={`hover:text-[#891a1c] font-[500] text-[1.1rem] `}
                     onClick={(e) => handleClickNavItem(e, item)}>
                     {item}
                  </a>
               ))}
            </ul>
         </div>
      </>
   );
}
