import {useRouter} from 'next/router';
import {useState} from 'react';
import {HomeBackground} from '../components/HomeBackground';
import {Login} from '../components/Login';
import {Logo} from '../components/Logo';
import {useAppDispatch} from '../store';

export default function RegisterPage() {
   const registerData = {
      email: '',
      phone: '',
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
         <div className='absolute flex flex-col items-center z-1 top-[40px] left-[50%] translate-x-[-50%] md:top-0 lg:top-[100px]'>
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
