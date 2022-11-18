import {useRouter} from 'next/router';
import {useEffect, useState, useMemo} from 'react';

import {useSession, signIn, signOut} from 'next-auth/react';
import Link from 'next/link';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {validateLoginSchema, validateRegisterSchema} from './validateSchema';
import {LoginValidateText} from '.';
import {Loading} from '../common';

import {SocialLogin} from './index';

interface ILogin {
   formValue: {
      email: string;
      password: string;
      repassword?: string;
   };

   handleSubmitForm: (data: any) => void;
   isShowLoading: boolean;
   errorText: string;
}

export default function Login({
   formValue,
   handleSubmitForm,
   isShowLoading = false,
   errorText = '',
}: ILogin) {
   console.log('form value trong register la gi', formValue);
   const router = useRouter();

   const yupFormValidateSchema =
      router.pathname === '/register'
         ? validateRegisterSchema
         : validateLoginSchema;

   const formik = useFormik({
      initialValues: formValue,
      validationSchema: Yup.object(yupFormValidateSchema),
      onSubmit: (values) => {
         handleSubmitForm(values);
      },
   });

   const isRegisterPage = useMemo(
      () => router.pathname === '/register',
      [router.pathname]
   );

   return (
      <div className='relattive w-[350px] mt-10 p-10 border-1 bg-red-700 rounded-md md:w-[400px] md:rounded-lg  md:p-5 lg:w-[450px] lg:p-10 '>
         <div className='flex flex-col '>
            <form
               autoComplete='off'
               onSubmit={formik.handleSubmit}
               className='w-full mb-4 flex flex-col gap-2'>
               <div>
                  <input
                     type='text'
                     name='email'
                     placeholder='email'
                     className='w-full text-white outline-none bg-transparent  border-b-[2px] border-black pb-[4px] mb-2 placeholder-gray-900 placeholder:uppercase'
                     value={formik.values.email}
                     onChange={formik.handleChange}
                  />
                  {formik.errors.email && formik.touched.email && (
                     <LoginValidateText warningText={formik.errors.email} />
                  )}
               </div>
               <div>
                  <input
                     type='password'
                     name='password'
                     placeholder='password'
                     className='w-full text-white bg-[none] outline-none bg-transparent border-b-[2px] border-black pb-[4px] mb-2 placeholder-gray-900 placeholder:uppercase'
                     value={formik.values.password}
                     onChange={formik.handleChange}
                  />
                  {formik.errors.password && formik.touched.password && (
                     <LoginValidateText warningText={formik.errors.password} />
                  )}
               </div>
               {isRegisterPage && (
                  <div>
                     <input
                        type='password'
                        name='repassword'
                        placeholder='re-password'
                        className='w-full text-white bg-[none] outline-none bg-transparent border-b-[2px] border-black pb-[4px] mb-2 placeholder-gray-900 placeholder:uppercase'
                        value={formik.values.repassword}
                        onChange={formik.handleChange}
                     />
                     {formik.errors.repassword && formik.touched.repassword && (
                        <LoginValidateText
                           warningText={formik.errors.repassword}
                        />
                     )}
                  </div>
               )}
               <button
                  type='submit'
                  disabled={isShowLoading}
                  className={`disabled:hover:bg-[#b91c1c] flex justify-center border-[1px] border-black rounded-lg uppercase text-[0.9rem] font-[400] text-white py-2 mt-3 mb-2 hover:bg-[#b91c1c] ${
                     !isShowLoading && 'hover:brightness-125'
                  }`}>
                  {isShowLoading && (
                     <span className='mr-2'>
                        <Loading />
                     </span>
                  )}
                  <span>{isRegisterPage ? 'Register' : 'Login'}</span>
               </button>
               <div className='text-center'>
                  {errorText && (
                     <LoginValidateText
                        warningText={errorText}
                        isError={errorText ? true : false}
                     />
                  )}
               </div>
            </form>

            <p className='text-center'>
               {isRegisterPage ? (
                  <span className='font-semibold'>
                     Đã có tài khoản
                     <span className='text-blue-900 pl-1 hover:text-blue-600'>
                        <Link href={'/membership'}>Đăng nhập</Link>
                     </span>
                  </span>
               ) : (
                  <span className='font-semibold'>
                     <span className='text-blue-900 pr-1 hover:text-blue-600'>
                        <Link href={'/register'}>Đăng kí</Link>
                     </span>
                     một tài khoản
                  </span>
               )}
            </p>
         </div>
         <p className='mt-5 text-white text-[0.9rem]'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
            mollitia recusandae iste ad assumenda culpa incidunt iusto maxime
            voluptate neque?
         </p>
         {/* login with social network */}
         <SocialLogin />
      </div>
   );
}
