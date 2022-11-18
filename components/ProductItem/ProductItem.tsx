import Image, {StaticImageData} from 'next/image';
import {useRouter} from 'next/router';

interface IProductItem {
   img: StaticImageData | string;
   displayPrice?: boolean;
}

export default function ProductItem({img, displayPrice = false}: IProductItem) {
   const router = useRouter();
   return (
      <div
         className='px-0 md:px-2 uppercase hover:cursor-pointer'
         onClick={() => router.push('/product/123')}>
         <div>
            <Image src={img} alt='' />
         </div>
         {displayPrice && (
            <div className='flex justify-between px-2 text-[0.9rem] md:text-[1rem]'>
               <div>
                  <h3>Product name</h3>
                  <p>$50</p>
               </div>
               <i className='fa-solid fa-cart-plus text-[#891b1c] mt-1'></i>
            </div>
         )}
      </div>
   );
}
