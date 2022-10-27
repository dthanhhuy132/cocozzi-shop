import Link from 'next/link';
import {useRouter} from 'next/router';
import HeaderSearch from './HeaderSearch';

interface IHeaderNavRps {
   handleCloseMenu: () => void;
   isShowMenuRps: Boolean;
}

const navbarHeader = ['shop', 'promo', 'event', 'info', 'membership'];
export default function HeaderNavResponsive({
   handleCloseMenu,
   isShowMenuRps,
}: IHeaderNavRps) {
   const router = useRouter();

   function handleClickNavItem(e: any, item: string) {
      e.preventDefault();
      handleCloseMenu();
      router.push(`/${item}`);
   }

   return (
      <div
         className={`animate__animated animate__faster ${
            isShowMenuRps ? 'animate__fadeInRight' : 'animate__fadeOutRight'
         } fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-90 z-50 pt-[100px] text-center text-white`}>
         <i
            className='absolute top-5 left-5 fa-sharp fa-solid fa-xmark text-[1.8rem]'
            onClick={() => handleCloseMenu()}></i>

         <div className='flex justify-center'>
            <HeaderSearch whiteLine={true} />
         </div>

         {/* nav bar */}
         <ul className='flex justify-center gap-x-4 gap-y-3 uppercase flex-col mt-5'>
            {navbarHeader.map((item) => (
               <a
                  key={item}
                  className={`hover:text-[#891b1c] font-[500] text-[1.1rem] `}
                  onClick={(e) => handleClickNavItem(e, item)}>
                  {item}
               </a>
            ))}
         </ul>
      </div>
   );
}
