import {useEffect, useState} from 'react';
import Image, {StaticImageData} from 'next/image';
import {useRouter} from 'next/router';
import FormatPrice from '../../helper/FormatPrice';
import stringToSlug from '../../helper/stringToSlug';
import uppercaseFirstLetter from '../../helper/uppercaseFirstLetter';
import useWindowDimensions from '../../hooks/UseWindowDimensions';
import {ProductDetailColorSelect, ProductDetailSizeSelect} from '../ProductDetailItem';
import {BsFillCartPlusFill, BsFillCartXFill} from 'react-icons/bs';
import {useAuthen} from '../../helper/useAuthen';
import Cookies from 'js-cookie';
import {toast} from 'react-toastify';

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
   const {width} = useWindowDimensions();

   const [isShowProductSelect, setIsShowProductSelect] = useState(false);

   // size selection
   const [sizeSelect, setSizeSelect] = useState(null);
   const [colorSelect, setColorSelect] = useState(null);

   // check user -------> click add to cart
   const accessToken = Cookies.get('accessToken');
   function handleClickAddToCart() {
      if (!accessToken) {
         toast.warning('Vui lòng đăng nhập/đăng kí để thêm sản phẩm vào giỏ hàng');
         router.push('/membership');
      } else {
         setIsShowProductSelect(true);
      }
   }

   // -----------> Click buy now
   function clickBuyNow() {
      if (!colorSelect || !sizeSelect) {
         toast.warning('Vui lòng chọn màu sắc và size sản phẩm');
      } else {
         console.log('product la gi', product);
         console.log('size la gi', sizeSelect);
         console.log('color la gi', colorSelect);

         // name, picture, productId,
         // const {name, pictures, price, productId} = product;
         const productPayment = {
            name: product.name,
            pictures: product.pictures,
            price: product.price,
            colorSelect: colorSelect,
            sizeAndId: sizeSelect,
         };
         router.push({pathname: '/payment', query: productPayment});
      }
   }

   // reset color and size select
   useEffect(() => {
      if (!isShowProductSelect) {
         setColorSelect(null);
         setSizeSelect(null);
      }
   }, [isShowProductSelect]);

   return (
      <div className='relative flex flex-col justify-between p-[2px] md:px-2 transition'>
         {/* avatar */}
         <div className='relative'>
            <img
               src={product?.pictures ? product?.pictures[0] : ''}
               className='rounded-md cursor-pointer'
               alt='Hình ảnh sản phẩm'
               onClick={() => router.push(`/product/${stringToSlug(product.name)}`)}
            />

            {/* product select size and color in pc mode */}
            {isShowProductSelect && (
               <div className='absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-80 px-2 rounded-md'>
                  <ProductDetailSizeSelect
                     sizeID={product.sizeID}
                     sizeList={product.size}
                     sizeSelect={sizeSelect}
                     setSizeSelect={setSizeSelect}
                     smallSize={true}
                  />
                  {/* color select */}
                  <ProductDetailColorSelect
                     colorList={product.colorList}
                     setColorSelect={setColorSelect}
                     colorSelect={colorSelect}
                     smallSize={true}
                  />

                  <div className='flex mt-3 gap-1 z-[120] '>
                     <button
                        className='w-[50%] py-1 text-white uppercase border-[1px] border-[#fff] hover:bg-black'
                        onClick={clickBuyNow}>
                        Buy now
                     </button>

                     <button className='w-[50%] py-1 text-white uppercase border-[1px] border-[#fff] hover:bg-black'>
                        Add to cart
                     </button>
                  </div>
               </div>
            )}
         </div>
         <div className={`flex justify-between mt-2 px-2 text-[0.9rem] md:text-[1rem]`}>
            <div className={`${smallName ? 'w-[100%]' : 'w-[80%]'} flex flex-col justify-between`}>
               <h3 className={`font-bold ${smallName && 'text-[0.9rem] text-center'} line-clamp-2`}>
                  {uppercaseFirstLetter(product?.name)}
               </h3>
               {showPrice && (
                  <p>
                     <FormatPrice price={product?.price}></FormatPrice>
                  </p>
               )}
            </div>
            {showPrice && (
               //
               //
               <>
                  {!isShowProductSelect ? (
                     <BsFillCartPlusFill
                        className='text-[1.4rem] text-gray-500 hover:text-[#891a1c] cursor-pointer'
                        onClick={handleClickAddToCart}
                     />
                  ) : (
                     <BsFillCartXFill
                        className='text-[1.4rem] text-gray-500 hover:text-[#891a1c] cursor-pointer'
                        onClick={() => setIsShowProductSelect(!isShowProductSelect)}
                     />
                  )}
               </>
            )}
         </div>
      </div>
   );
}
