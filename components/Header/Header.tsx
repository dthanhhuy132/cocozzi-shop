import {HeaderMarquee} from '../HeaderMarquee';
import Link from 'next/link';
import HeaderSearch from './HeaderSearch';
import {useRouter} from 'next/router';
import {Logo} from '../Logo';
import {useMemo} from 'react';

const navbarHeader = ['shop', 'promo', 'event', 'info', 'membership'];

export default function Header() {
   const router = useRouter();

   const hideHeaderMarquee = useMemo(() => {
      const excludePath = ['/event'];
      const currentPath = router.pathname;
      return excludePath.indexOf(currentPath) === -1;
   }, [router.pathname]);

   function handleShowBag() {
      console.log('chay cai nay thu coi ra gi');
   }

   return (
      <>
         <div className='md:px-10 pt-5 pb-7 md:flex md:justify-between md:items-end'>
            <div className='text-center'>
               <Logo />
            </div>
            {/* nav bar menu */}
            <ul className='flex justify-center gap-x-4 gap-y-3 mt-5 uppercase flex-wrap md:gap-5 md:flex-nowrap'>
               {navbarHeader.map((item) => (
                  <Link href={`/${item}`} key={item}>
                     <a
                        className={`hover:text-[#891b1c] font-[500] ${
                           router.pathname === `/${item}` && 'text-[#891b1c]'
                        }`}
                     >
                        {item}
                     </a>
                  </Link>
               ))}

               {/* search */}
               <HeaderSearch></HeaderSearch>

               <p className='flex' onMouseEnter={handleShowBag}>
                  <span className='font-[500] hover:cursor-pointer hover:text-[#891b1c] '>
                     bag
                  </span>
                  <span className='font-bold text-[#891b1c] pl-1'>[2]</span>
               </p>
            </ul>
         </div>

         {hideHeaderMarquee && <HeaderMarquee></HeaderMarquee>}
      </>
   );
}
