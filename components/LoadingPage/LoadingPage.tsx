import {useState, useEffect} from 'react';

interface ILoadingInterface {
   children?: any;
}

export default function LoadingPage({
   children = 'loading page',
}: ILoadingInterface) {
   const [hideLoading, setHideLoading] = useState(false);
   const [timeoutLoading, setTimeoutLoading] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setHideLoading(true);
      }, 2000);
   }, []);

   useEffect(() => {
      setTimeout(() => {
         setTimeoutLoading(false);
      }, 3000);
   }, []);
   return (
      <>
         {timeoutLoading && (
            <div
               className={` ${
                  hideLoading ? 'animate__animated animate__fadeOut' : ''
               } fixed top-0 left-0 bottom-0 right-0 bg-white opacity-95 z-10 
         flex text-center items-center`}>
               <div className='animate__animated animate__fadeInUp relative z-20 text-black text-[1.2rem] font-semibold mx-auto'>
                  {children}
               </div>
            </div>
         )}
      </>
   );
}
