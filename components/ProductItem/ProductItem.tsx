import Image, {StaticImageData} from 'next/image';
import {useRouter} from 'next/router';
import FormatPrice from '../../helper/FormatPrice';
import stringToSlug from '../../helper/stringToSlug';
import uppercaseFirstLetter from '../../helper/uppercaseFirstLetter';

interface IProductItem {
   product: any;
   displayPrice?: boolean;
   smallName?: boolean;
   showPrice?: boolean;
}

export default function ProductItem({
   product,
   displayPrice = false,
   smallName = false,
   showPrice = true,
}: IProductItem) {
   const router = useRouter();

   function handleClickAddToCart() {}

   const productAvatar = product?.pictures ? product?.pictures[0] : '';
   return (
      <div className='relative flex flex-col justify-between p-[2px] md:px-2 transition'>
         {/* avatar */}
         <div>
            <img
               src={productAvatar}
               className='rounded-md cursor-pointer'
               alt='Hình ảnh sản phẩm'
               onClick={() => router.push(`/product/${stringToSlug(product.name)}`)}
            />
         </div>
         <div className={`flex justify-between mt-2 px-2 text-[0.9rem] md:text-[1rem]`}>
            <div className='w-[80%] flex flex-col justify-between'>
               <h3 className={`font-bold ${smallName && 'text-[0.75rem]'}`}>
                  {uppercaseFirstLetter(product?.name)}
               </h3>
               {showPrice && (
                  <p>
                     <FormatPrice price={product?.price}></FormatPrice>
                  </p>
               )}
            </div>
            {showPrice && (
               <i
                  className='fa-solid fa-cart-plus text-[1.2rem] text-gray-500 hover:text-[#891a1c] cursor-pointer mt-1'
                  onClick={handleClickAddToCart}></i>
            )}
         </div>

         <div className='absolute'>
            <div></div>
         </div>
      </div>
   );
}
