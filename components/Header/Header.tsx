import {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Cookies from 'js-cookie';
import cookie from 'cookie';

import HeaderSearch from './HeaderSearch';
import {HeaderMarquee} from '../HeaderMarquee';
import HeaderNavResponsive from './HeaderNavResponsive';
import {BsBag} from 'react-icons/bs';
import {BiUser} from 'react-icons/bi';
import {AiOutlineMenu} from 'react-icons/ai';
import {BagHover} from '../Bag';
import {Logo} from '../Logo';

import useWindowDimensions from '../../hooks/UseWindowDimensions';
import {useSelector} from 'react-redux';
import HeaderUserControl from './HeaderUserControl';

const navbarHeader = ['shop', 'promo', 'event', 'info', 'membership'];
export default function Header({carts}) {
   const {user} = useSelector((state: any) => state.auth);
   console.log('usercho nay la gi', user);
   const router = useRouter();

   const {isMobile} = useWindowDimensions();
   const [isShowMenuRps, setShowMenuRps] = useState(false);
   const [isShowBag, setIsShowBag] = useState(false);
   const [isShowUserControl, setIsShowUserControl] = useState(false);
   const [hasToken, setHasToken] = useState(false);

   const {token} = useSelector((state: any) => state.auth);
   useEffect(() => {
      setHasToken(token ? true : false);
   }, [token]);

   const hideHeaderMarquee = useMemo(() => {
      const excludePath = ['/event'];
      const currentPath = router.pathname;
      return excludePath.indexOf(currentPath) === -1;
   }, [router.pathname]);

   return (
      <>
         <div className='sticky top-0 flex py-3 md:px-10 lg:flex justify-between lg:items-center z-20 bg-white border-b-[1px]'>
            <div className='flex items-center justify-between px-2 lg:w-1/3'>
               <Logo />
            </div>
            {/* menu bar */}
            <ul className='hidden lg:flex justify-center gap-x-4 gap-y-3 uppercase lg:w-1/3 flex-wrap md:gap-5 md:flex-nowrap'>
               {navbarHeader.map((item) => (
                  <Link href={`/${item}`} key={item}>
                     <a
                        className={`hover:text-[#891b1c] font-[400] text-[1.15rem] ${
                           router.pathname === `/${item}` &&
                           'text-[#891b1c] font-[600]'
                        }`}>
                        {item}
                     </a>
                  </Link>
               ))}
            </ul>

            <div className='px-3 flex justify-end items-center gap-x-4 uppercase lg:w-1/3 '>
               <div className='hidden lg:block'>
                  <HeaderSearch></HeaderSearch>
               </div>
               <div
                  className='relative before:absolute before:top-0 before:right-0
                  before:w-[50px] before:h-[40px] group cursor-pointer'
                  onMouseEnter={() => !isMobile && setIsShowUserControl(true)}
                  onMouseLeave={() => !isMobile && setIsShowUserControl(false)}>
                  <BiUser
                     fontSize='1.6rem'
                     className='relative hover:text-[#891b1c] group-hover:text-[#891b1c] cursor-pointer '
                     onClick={() => {
                        !hasToken && router.push('/membership');
                        // isMobile && router.push('/my-order');
                     }}
                  />

                  {isShowUserControl && (
                     <HeaderUserControl
                        hasToken={hasToken}
                        isMobile={isMobile}
                     />
                  )}
               </div>
               {hasToken && (
                  <div
                     className='relative font-[500] hover:cursor-pointer hover:text-[#891b1c]'
                     onMouseEnter={() => !isMobile && setIsShowBag(true)}
                     onMouseLeave={() => !isMobile && setIsShowBag(false)}>
                     <BsBag
                        fontSize='1.5rem'
                        onClick={() => router.push('/bag')}
                     />
                     <span
                        className='absolute left-[50%] translate-x-[-50%] bottom-[0px]  font-bold text-[#891b1c] text-[0.7rem]'
                        onClick={() => router.push('/bag')}>
                        68
                     </span>

                     {isShowBag && <BagHover />}
                  </div>
               )}
               <div className='lg:hidden'>
                  <AiOutlineMenu
                     className=' text-[1.6rem] cursor-pointer hover:text-[#891b1c]'
                     onClick={() => setShowMenuRps(true)}
                  />
               </div>
            </div>
         </div>

         {hideHeaderMarquee && <HeaderMarquee></HeaderMarquee>}
         <HeaderNavResponsive
            handleCloseMenu={() => setShowMenuRps(false)}
            isShowMenuRps={isShowMenuRps}
         />
      </>
   );
}
