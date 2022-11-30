import Image, {StaticImageData} from 'next/image';
import {useRouter} from 'next/router';

interface IProductItem {
   img: StaticImageData | string;
   displayPrice?: boolean;
   smallName?: boolean;
}

export default function ProductItem({img, displayPrice = false, smallName = false}: IProductItem) {
   const router = useRouter();
   return (
      <div className='p-[2px] md:px-2 transition'>
         <div className='relative cursor-pointer rounded-[12px] md:rounded-[16px] overflow-hidden'>
            <Image
               className='absolute top-0 left-0 w-full transition hover:scale-[1.1]'
               src={img}
               alt=''
               layout='responsive'
               objectFit='cover'
               onClick={() => router.push('/product/123')}
            />
         </div>
         {displayPrice && (
            <div className={`flex justify-between mt-2 px-2 text-[0.9rem] md:text-[1rem]`}>
               <div>
                  <h3>Product name</h3>
                  <p>$50</p>
               </div>
               <i className='fa-solid fa-cart-plus text-[1.2rem] text-gray-500 hover:text-[#891a1c] cursor-pointer mt-1'></i>
            </div>
         )}
      </div>
   );
}
