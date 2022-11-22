import Image, {StaticImageData} from 'next/image';
import {useRouter} from 'next/router';

interface IProductItem {
   img: StaticImageData | string;
   displayPrice?: boolean;
}

export default function ProductItem({img, displayPrice = false}: IProductItem) {
   const router = useRouter();
   return (
      <div className='p-2 md:px-2 transition hover:border-2 hover:border-[#891b1c] rounded-lg'>
         <div className='cursor-pointer rounded-md overflow-hidden'>
            <Image
               className='transition  hover:scale-[1.1] '
               src={img}
               alt=''
               onClick={() => router.push('/product/123')}
            />
         </div>
         {displayPrice && (
            <div className='flex justify-between px-2 text-[0.9rem] md:text-[1rem]'>
               <div>
                  <h3>Product name</h3>
                  <p>$50</p>
               </div>
               <i className='fa-solid fa-cart-plus text-[1.2rem] text-gray-500 hover:text-[#891b1c] cursor-pointer mt-1'></i>
            </div>
         )}
      </div>
   );
}
