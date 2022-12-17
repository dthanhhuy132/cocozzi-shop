import Image, {StaticImageData} from 'next/image';
import {useRouter} from 'next/router';
import FormatPrice from '../../helper/FormatPrice';

interface IProductItem {
   product: any;
   displayPrice?: boolean;
   smallName?: boolean;
}

export default function ProductItem({
   product,
   displayPrice = false,
   smallName = false,
}: IProductItem) {
   const router = useRouter();

   const productAvatar = product?.pictures ? product?.pictures[0] : '';

   return (
      <div className='p-[2px] md:px-2 transition'>
         {/* avatar */}
         <img src={productAvatar} className='rounded-md' alt='Hình ảnh sản phẩm' />
         <div className={`flex justify-between mt-2 px-2 text-[0.9rem] md:text-[1rem]`}>
            <div className='w-[80%] flex flex-col justify-between'>
               <h3 className='font-bold'>{product?.name}</h3>
               <p>
                  <FormatPrice price={product?.price}></FormatPrice>
               </p>
            </div>
            <i className='fa-solid fa-cart-plus text-[1.2rem] text-gray-500 hover:text-[#891a1c] cursor-pointer mt-1'></i>
         </div>
      </div>
   );
}
