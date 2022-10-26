import {HomeBackground} from '../components/HomeBackground';
import {Login} from '../components/Login';
import {Logo} from '../components/Logo';

export default function MembershipPage() {
   return (
      <div className='relative'>
         <HomeBackground isHomePage={false}></HomeBackground>
         <div className=' absolute flex flex-col items-center z-10 top-[50px] left-[50%] translate-x-[-50%] md:top-0 lg:top-[100px]'>
            <div className='hidden lg:block'>
               <Logo width='250px' height='60px'></Logo>
            </div>
            <Login></Login>
         </div>
      </div>
   );
}
