import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {HomeBackground} from '../HomeBackground';

export default function Login() {
   const router = useRouter();
   const [showRegisterForm, setShowRegisterForm] = useState(false);

   useEffect(() => {
      if (router.pathname === '/register') {
         setShowRegisterForm(true);
      } else {
         setShowRegisterForm(false);
      }
   }, [router.pathname]);
   return (
      <div className='relattive w-[350px] md:w-[400px] lg:w-[450px] h-auto bg-red-700 mt-10 border-1 md:rounded-lg p-10'>
         <div className='flex flex-col '>
            <form className='w-full mb-4' autoComplete='off'>
               <input
                  type='text'
                  placeholder='phone/email'
                  className='w-full text-[14px] bg-[none] outline-none bg-transparent border-b-2 border-black pb-[4px] mb-2 placeholder-black placeholder:uppercase placeholder:font-bold'
               />
               <input
                  type='password'
                  placeholder='pass'
                  className='w-full text-[14px] bg-[none] outline-none bg-transparent border-b-2 border-black pb-[4px] mb-2 placeholder-black placeholder:uppercase placeholder:font-bold'
               />

               {showRegisterForm && (
                  <div className='flex gap-10'>
                     <span>Gender: </span>
                     <div className='flex gap-4'>
                        <div>
                           <input
                              type='radio'
                              value='Male'
                              name='gender'
                              className='cursor-pointer'
                           />{' '}
                           Male
                        </div>
                        <div>
                           <input
                              type='radio'
                              value='Female'
                              name='gender'
                              className='cursor-pointer'
                           />
                           Female
                        </div>
                     </div>
                  </div>
               )}
            </form>

            <button
               className='border-[1px] border-black round-sm uppercase text-[0.9rem] font-[400] text-white py-1 mb-2 hover:bg-[#b91c1c] hover:brightness-125'
               onClick={() =>
                  showRegisterForm
                     ? router.push('/membership')
                     : console.log('handleLogin run hear')
               }
            >
               Login
            </button>
            <button
               className='border-[1px] border-black round-sm uppercase text-[0.9rem] font-[400] text-white py-1 hover:bg-[#b91c1c] hover:brightness-125'
               onClick={() => router.push('/register')}
            >
               register
            </button>
         </div>
         <p className='mt-5'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
            mollitia recusandae iste ad assumenda culpa incidunt iusto maxime
            voluptate neque?
         </p>
         {/* login with social network */}
         <div className='flex flex-col gap-2 mt-10'>
            <p className='uppercase text-center font-bold text-white '>
               Tiếp tục với{' '}
            </p>

            {/* login with google */}
            <div className='relative p-2 text-center bg-white'>
               <Image
                  src='https://i.stack.imgur.com/22WR2m.png'
                  className='absolute top-[50%] left-2 translate-y-[-50%] w-[18px] h-[18px]'
                  alt=''
               />
               Tiếp tục với google
            </div>

            {/* login with facebook */}
            <div className='relative p-2 text-center bg-white'>
               <Image
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/640px-Facebook_icon_2013.svg.png'
                  className='absolute top-[50%] left-2 translate-y-[-50%] w-[18px] h-[18px]'
                  alt=''
               />
               Tiếp tục với facebook
            </div>
            {/* login with apple */}
            <div className='relative p-2 text-center bg-white'>
               <Image
                  src='https://cdn3.iconfinder.com/data/icons/picons-social/57/56-apple-512.png'
                  className='absolute top-[50%] left-2 translate-y-[-50%] w-[18px] h-[18px]'
                  alt=''
               />
               Tiếp tục với apple
            </div>
         </div>
      </div>
   );
}
