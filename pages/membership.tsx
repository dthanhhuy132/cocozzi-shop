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
import {getTokenExpireTime, getTokenSSRAndCSS, parseJwt} from '../helper';
import {login} from '../store/auth/authSlice';

export default function MembershipPage() {
   const loginData = {email: '', password: ''};

   const router = useRouter();
   const dispatch = useAppDispatch();

   const [errorLogin, setErrorLogin] = useState<any>('');
   const [isShowLoading, setIsShowLoading] = useState<boolean>(false);

   function handleLogin(data: any) {
      let fakeToken =
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYzNjkwNzU2ZGJjNmMzZjM2ZDVlZTYzMiIsImVtYWlsIjoidGVzdGFkbWluQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEyJE1zYmJVMElpWWJLcVQ2ZEJjUEZHZWVUOEQvL3lycXg2ZFFhUjZRRkUvYkp1MkMxOFdiZmMuIiwiZnVsbE5hbWUiOm51bGwsInVzZXJJbWFnZSI6bnVsbCwicm9sZSI6ImFkbWluIiwicmVmcmVzaFRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmtZWFJoSWpwN0lsOXBaQ0k2SWpZek5qa3dOelUyWkdKak5tTXpaak0yWkRWbFpUWXpNaUlzSW1WdFlXbHNJam9pZEdWemRHRmtiV2x1UUdkdFlXbHNMbU52YlNJc0luQmhjM04zYjNKa0lqb2lKREpoSkRFeUpFMXpZbUpWTUVscFdXSkxjVlEyWkVKalVFWkhaV1ZVT0VRdkwzbHljWGcyWkZGaFVqWlJSa1V2WWtwMU1rTXhPRmRpWm1NdUlpd2lablZzYkU1aGJXVWlPbTUxYkd3c0luVnpaWEpKYldGblpTSTZiblZzYkN3aWNtOXNaU0k2SW1Ga2JXbHVJaXdpY21WbWNtVnphRlJ2YTJWdUlqcHVkV3hzTENKaFpHUnlaWE56TVNJNmJuVnNiQ3dpWVdSa2NtVnpjeklpT201MWJHd3NJbUZrWkhKbGMzTXpJanB1ZFd4c0xDSmpjbVZoZEdWa1FYUWlPaUl5TURJeUxURXhMVEEzVkRFek9qSTFPalF5TGpnek0xb2lMQ0pmWDNZaU9qQjlMQ0pwWVhRaU9qRTJOamd3TURJM09EY3NJbVY0Y0NJNk1UWTJPREE0T1RFNE4zMC5WaTZNbXdqWWVTTERSQVdyWFE3N3ZwUkVNMi1QWmgtZm5jd0t2bkdnbHFnIiwiYWRkcmVzczEiOm51bGwsImFkZHJlc3MyIjpudWxsLCJhZGRyZXNzMyI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMi0xMS0wN1QxMzoyNTo0Mi44MzNaIiwiX192IjowfSwiaWF0IjoxNjY5MjE5ODAyLCJleHAiOjE2NjkyMjM0MDJ9.qWAfWrZaTMTv5FUWXEeK-NizbeDtIq5NSxFE4c4Nbmk';

      setIsShowLoading(true);
      // dispatch(loginAsyncAction(data)).then((res) => {
      //    if (res.payload.ok) {
      //       const token = res.payload.user.accessToken;

      //       const expireTokenDay = getTokenExpireTime(token);

      //       Cookies.set('token', token, {expires: expireTokenDay});
      //       router.push('/');
      //    } else {
      //       setErrorLogin(res.payload.message);
      //    }
      //    setIsShowLoading(false);
      // });

      // fakelogintoken:
      // const token = res.payload.user.accessToken;

      const expireTokenDay = getTokenExpireTime(fakeToken);
      dispatch(login(fakeToken));
      Cookies.set('token', fakeToken, {expires: expireTokenDay});
      router.push('/');
   }

   return (
      <div className='relative'>
         <HomeBackground ishomepage={false}></HomeBackground>
         <div className='fixed top-0 right-0 left-0 bottom-0 bg-black opacity-80'></div>
         <div className='absolute flex flex-col items-center z-10 top-[50px] left-[50%] translate-x-[-50%] md:top-0 lg:top-[100px]'>
            <div className='hidden lg:block'>
               <Logo width='250px' height='60px'></Logo>
            </div>
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
