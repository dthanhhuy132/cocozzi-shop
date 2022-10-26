import Link from 'next/link';
import {useRouter} from 'next/router';
import {Logo} from '../Logo';
import {useMemo, useState} from 'react';

import HeaderSearch from './HeaderSearch';
import {HeaderMarquee} from '../HeaderMarquee';
import HeaderNavResponsive from './HeaderNavResponsive';

const navbarHeader = ['shop', 'promo', 'event', 'info', 'membership'];

export default function Header() {
   const router = useRouter();
   const [isShowMenuRps, setShowMenuRps] = useState(false);

   const hideHeaderMarquee = useMemo(() => {
      const excludePath = ['/event'];
      const currentPath = router.pathname;
      return excludePath.indexOf(currentPath) === -1;
   }, [router.pathname]);

   function handleShowBag() {}

   return (
      <>
         <div className='md:px-10 pt-5 pb-5 lg:flex lg:justify-between lg:items-end'>
            <div className='flex items-center justify-between px-2 lg:w-1/3'>
               <Logo />
               <div className='lg:hidden'>
                  <i
                     className='fa-solid fa-bars text-[1.5rem] cursor-pointer hover:text-[#891b1c]'
                     onClick={() => setShowMenuRps(true)}></i>
               </div>
            </div>
            {/* menu bar */}
            <ul className='hidden lg:flex justify-center gap-x-4 gap-y-3 uppercase lg:w-1/3 flex-wrap md:gap-5 md:flex-nowrap'>
               {navbarHeader.map((item) => (
                  <Link href={`/${item}`} key={item}>
                     <a
                        className={`hover:text-[#891b1c] font-[500] ${
                           router.pathname === `/${item}` && 'text-[#891b1c]'
                        }`}>
                        {item}
                     </a>
                  </Link>
               ))}
            </ul>

            <div
               className='hidden lg:flex justify-end gap-x-4 uppercase lg:w-1/3 '
               onMouseEnter={handleShowBag}>
               <HeaderSearch></HeaderSearch>
               <span className='font-[500]  hover:cursor-pointer hover:text-[#891b1c] '>
                  bag
                  <span className='font-bold text-[#891b1c] pl-1'>[2]</span>
               </span>
            </div>
         </div>
         {/* {isShowMenuRps && (
            <HeaderNavResponsive
               handleCloseMenu={() => setShowMenuRps(false)}
               isShowMenuRps={isShowMenuRps}
            />
         )} */}

         <HeaderNavResponsive
            handleCloseMenu={() => setShowMenuRps(false)}
            isShowMenuRps={isShowMenuRps}
         />
         {hideHeaderMarquee && <HeaderMarquee></HeaderMarquee>}
      </>
   );
}
