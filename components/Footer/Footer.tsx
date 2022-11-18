import {useMemo, useEffect} from 'react';

import {Logo} from '../Logo';
import {FiInstagram} from 'react-icons/fi';
import {ImFacebook} from 'react-icons/im';
import {IoLogoYoutube} from 'react-icons/io';
import {SiTiktok} from 'react-icons/si';
import {useRouter} from 'next/router';
ImFacebook;
export default function Footer() {
   const router = useRouter();

   const hideHeaderMarquee = useMemo(() => {
      const excludePath = ['/event'];
      const currentPath = router.pathname;
      return excludePath.indexOf(currentPath) === -1;
   }, [router.pathname]);

   const adjustFooter = useMemo(() => {
      const includePath = ['/shop', '/promo', '/info', '/bag'];
      return includePath.indexOf(router.pathname) >= 0;
   }, [router.pathname]);

   useEffect(() => {
      // const script = document.createElement('script');
      // script.src = 'https://sp.zalo.me/plugins/sdk.js';
      // document.body.append(script);
   }, []);

   return (
      <div
         className={`py-3 px-2 md:px-10 border-t-[1px] pt-5 ${
            adjustFooter ? 'mt-10' : ''
         }`}>
         <div className='flex items-center gap-3 md:gap-5'>
            <Logo width='120px' height='24px'></Logo>
            <FiInstagram />
            <ImFacebook />
            <IoLogoYoutube />
            <SiTiktok />
         </div>

         <div className='flex flex-col md:flex-row gap-5 md:gap-20 mt-4 uppercase font-semibold text-[0.8rem]'>
            <div>
               <p>business registration number. 0314200458</p>
               <p>Address:</p>
               <p>
                  327/6A Nguyen dinh chieu, ward 5, district 3, ho chi minh city
               </p>
               <p>
                  122 phan thanh, ward thac gian, thanh khe district, da nang
                  city
               </p>
               <p>hot line: (+84) 933 322199</p>
               <p>email: info@cocozzi.vn</p>
            </div>

            <div>
               <p>the all company limited</p>
               <p>business registration no. 0317155482</p>
               <p>
                  address: 116 nguyen van thu, da cao ward, district 1, HCMC.
               </p>
               <p>hot line: (+84) 933 322199</p>
               <p>email: info@theall.vn</p>
            </div>
         </div>

         <div
            className='zalo-chat-widget'
            data-oaid='665948928452952699'
            data-welcome-message='Rất vui khi được hỗ trợ bạn!'
            data-autopopup='0'
            data-width='300'
            data-height='300'
         />
      </div>
   );
}
