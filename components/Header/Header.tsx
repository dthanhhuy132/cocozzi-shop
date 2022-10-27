import Link from 'next/link';
import {useRouter} from 'next/router';
import {Logo} from '../Logo';
import {useMemo, useState} from 'react';

import HeaderSearch from './HeaderSearch';
import {HeaderMarquee} from '../HeaderMarquee';
import HeaderNavResponsive from './HeaderNavResponsive';
import {FiShoppingCart} from 'react-icons/fi';
import {BiUser} from 'react-icons/bi';
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
         <div className='flex pt-5 pb-5  md:px-10 lg:flex justify-between lg:items-end'>
            <div className='flex items-center justify-between px-2 lg:w-1/3'>
               <Logo />
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
               className='px-3 flex justify-end gap-x-4 uppercase lg:w-1/3 '
               onMouseEnter={handleShowBag}>
               <div className='hidden lg:block'>
                  <HeaderSearch></HeaderSearch>
               </div>

               <BiUser fontSize='1.5rem' className='text-[1.6rem]' />
               <span className='relative font-[500]  hover:cursor-pointer hover:text-[#891b1c]  '>
                  <FiShoppingCart fontSize='1.4rem' />
                  <span className='absolute top-[-7px] left-[22px] font-bold text-[#891b1c] text-[0.8rem]'>
                     68
                  </span>
               </span>
               <div className='lg:hidden ml-3'>
                  <i
                     className='fa-solid fa-bars text-[1.5rem] cursor-pointer hover:text-[#891b1c]'
                     onClick={() => setShowMenuRps(true)}></i>
               </div>
            </div>
         </div>
         <HeaderNavResponsive
            handleCloseMenu={() => setShowMenuRps(false)}
            isShowMenuRps={isShowMenuRps}
         />
         {hideHeaderMarquee && <HeaderMarquee></HeaderMarquee>}
      </>
   );
}
