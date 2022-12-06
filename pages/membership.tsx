import {signIn, useSession} from 'next-auth/react';
import {useState} from 'react';

import {HomeBackground} from '../components/HomeBackground';
import {Login} from '../components/Login';
import {useEffect} from 'react';
import {Logo} from '../components/Logo';
import {useAppDispatch} from '../store';
import {loginAsyncAction} from '../store/auth/authAsyncAction';
import {useRouter} from 'next/router';

import Cookies from 'js-cookie';
import {getTokenExpireTime, parseJwt} from '../helper';

export default function MembershipPage() {
   const loginData = {email: '', password: ''};

   const router = useRouter();
   const dispatch = useAppDispatch();

   const [errorLogin, setErrorLogin] = useState<any>('');
   const [isShowLoading, setIsShowLoading] = useState<boolean>(false);

   function handleLogin(data: any) {
      setIsShowLoading(true);
      dispatch(loginAsyncAction(data)).then((res) => {
         if (res.payload.ok) {
            const accessToken = res.payload.user.accessToken;

            const expireAccessTokenDay = getTokenExpireTime(accessToken);

            Cookies.set('accessToken', accessToken, {expires: 10});
            router.push('/');
         } else {
            setErrorLogin(res.payload.message);
         }
         setIsShowLoading(false);
      });
   }

   return (
      <div className='relative'>
         <HomeBackground ishomepage={false}></HomeBackground>
         <div className='fixed top-0 right-0 left-0 bottom-0 bg-black opacity-80 z-0'></div>
         <div className='absolute flex flex-col items-center z-1 top-[50px] left-[50%] translate-x-[-50%] md:top-0 lg:top-[100px]'>
            <Login
               formValue={loginData}
               handleSubmitForm={(data) => handleLogin(data)}
               isShowLoading={isShowLoading}
               errorText={errorLogin}
            />
         </div>
      </div>
   );
}
