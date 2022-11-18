import {useRouter} from 'next/router';
import {useState} from 'react';
import {HomeBackground} from '../components/HomeBackground';
import {Login} from '../components/Login';
import {Logo} from '../components/Logo';
import {useAppDispatch} from '../store';

export default function RegisterPage() {
   const registerData = {
      email: '',
      password: '',
      repassword: '',
   };
   const dispatch = useAppDispatch();
   const router = useRouter();

   const [isShowLoading, setIsShowLoading] = useState(false);
   const [errorLogin, setErrorLogin] = useState<any>('');

   function handleRegister() {}
   return (
      <div className='relative'>
         <HomeBackground ishomepage={false}></HomeBackground>
         <div className='fixed top-0 right-0 left-0 bottom-0 bg-black opacity-80'></div>
         <div className='absolute top-[30%] md:top-[45%] lg:top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center z-50'>
            <div className='hidden lg:block'>
               <Logo width='250px' height='60px'></Logo>
            </div>
            <Login
               formValue={registerData}
               handleSubmitForm={handleRegister}
               isShowLoading={isShowLoading}
               errorText={errorLogin}
            />
         </div>
      </div>
   );
}
