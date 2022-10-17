import {HomeBackground} from '../components/HomeBackground';
import {Login} from '../components/Login';
import {Logo} from '../components/Logo';

export default function MembershipPage() {
   return (
      <div className='relative'>
         <HomeBackground isHomePage={false}></HomeBackground>
         <div className='absolute top-[30%] md:top-[45%] lg:top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center z-50'>
            <div className='hidden lg:block'>
               <Logo width='200px' height='60px'></Logo>
            </div>
            <Login></Login>
         </div>
      </div>
   );
}
