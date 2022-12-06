import {useEffect, useMemo, useRef, useState} from 'react';
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
import SubMenu from './SubMenu';
import useGlobalState from '../../state';

const navbarHeader = ['shop', 'promo', 'event', 'info', 'membership'];
const submenuArr = ['shop', 'event'];
export default function Header({carts}) {
   const router = useRouter();
   const [, setHeaderHeight] = useGlobalState('headerHeight');

   const {isMobile} = useWindowDimensions();
   // menu responsive + bag
   const [isShowMenuRps, setShowMenuRps] = useState(false);
   const [isShowBag, setIsShowBag] = useState(false);

   // submenu
   const [isShowSubMenu, setIsShowSubMenu] = useState(true);
   const [submenuName, setSubmenuName] = useState('');

   const [isShowUserControl, setIsShowUserControl] = useState(false);
   const [hasToken, setHasToken] = useState(false);

   const {accessToken} = useSelector((state: any) => state.auth);

   useEffect(() => {
      setHasToken(accessToken ? true : false);
   }, [accessToken]);

   // header marquee
   const hideHeaderMarquee = useMemo(() => {
      const excludePath = ['/event'];
      const currentPath = router.pathname;
      return excludePath.indexOf(currentPath) === -1 && currentPath.indexOf('admin') < 0;
   }, [router.pathname]);

   function showSubMenu(hoverItem: string) {
      if (submenuArr.indexOf(hoverItem) >= 0 && !isMobile) {
         setIsShowSubMenu(true);
         setSubmenuName(hoverItem);
      } else {
         setIsShowSubMenu(false);
      }
   }

   const headerRef = useRef(null);

   useEffect(() => {
      const headerHeight = headerRef.current.getBoundingClientRect()?.height;
      setHeaderHeight(headerHeight);
   }, []);
   return (
      <>
         <div
            className='sticky top-0 left-0 right-0 flex py-3 md:px-10 lg:flex justify-between lg:items-center bg-white border-b-[1px] z-50'
            ref={headerRef}>
            <div className='order-2 lg:order-[unset] flex absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:relative md:top-[unset] md:left-[unset] md:translate-x-0 md:translate-y-0 md:order-0 items-center justify-between lg:w-1/3 z-20'>
               <div className='w-[100px] h-[20px] md:w-[130px] md:h-[25px]'>
                  <Logo />
               </div>
            </div>
            {/* menu bar */}
            <ul
               className='order-1 relative hidden lg:flex justify-center gap-x-5 gap-y-3 uppercase lg:w-1/3 flex-wrap md:gap-5 lg:gap-[70px] md:flex-nowrap z-50 before:content-(" ") before:absolute before:bottom-[-100%] before:left-[-10%] before:w-[120%] before:h-[30px] before:z-[51]'
               onMouseLeave={() => !isMobile && setIsShowSubMenu(false)}>
               {navbarHeader.map((item, index) => (
                  <div
                     key={index}
                     className='relative font-[900]'
                     style={{fontFamily: 'GilroySemibold'}}
                     onMouseEnter={() => showSubMenu(item)}>
                     <Link href={`/${item}`}>
                        <a
                           className={`hover:text-[#891a1c] text-[1rem] ${
                              router.pathname === `/${item}` && 'text-[#891a1c] font-[600]'
                           }`}>
                           {item}
                        </a>
                     </Link>
                     <SubMenu isShowSubMenu={isShowSubMenu} name={submenuName} hoverItem={item} />
                  </div>
               ))}
            </ul>

            <div className='order-3 px-3 flex justify-end items-center gap-x-4 uppercase lg:w-1/3'>
               <div className='hidden lg:block'>
                  <HeaderSearch></HeaderSearch>
               </div>
               <div
                  className='relative before:absolute before:top-0 before:right-0
                  before:w-[50px] before:h-[40px] group cursor-pointer'
                  onMouseEnter={() => !isMobile && setIsShowUserControl(true)}
                  onMouseLeave={() => !isMobile && setIsShowUserControl(false)}>
                  <BiUser
                     className='relative hover:text-[#891a1c] group-hover:text-[#891a1c] cursor-pointer text-[1.3rem] md:text-[1.6rem]'
                     onClick={() => {
                        !hasToken && router.push('/membership');
                        // isMobile && router.push('/my-order');
                     }}
                  />

                  {isShowUserControl && (
                     <HeaderUserControl hasToken={hasToken} isMobile={isMobile} />
                  )}
               </div>
               {hasToken && (
                  <div
                     className='order-3 relative font-[500] hover:cursor-pointer hover:text-[#891a1c]'
                     onMouseEnter={() => !isMobile && setIsShowBag(true)}
                     onMouseLeave={() => !isMobile && setIsShowBag(false)}>
                     <BsBag
                        fontSize={isMobile ? '1.2rem' : '1.4rem'}
                        onClick={() => router.push('/bag')}
                     />
                     <span
                        className='absolute left-[50%] translate-x-[-50%] bottom-0 md:bottom-[1px] font-bold text-[#891a1c] text-[0.6rem] md:text-[0.7rem]'
                        onClick={() => router.push('/bag')}>
                        68
                     </span>

                     {isShowBag && <BagHover />}
                  </div>
               )}
            </div>
            <div className='order-1 lg:hidden'>
               <AiOutlineMenu
                  className='text-[1.3rem] mx-2 md:mx-0 md:text-[1.6rem] cursor-pointer hover:text-[#891a1c]'
                  onClick={() => setShowMenuRps(true)}
               />
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
