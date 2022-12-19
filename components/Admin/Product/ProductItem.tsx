import Image from 'next/image';
import {useState} from 'react';
import {AiFillCopy, AiTwotoneEdit} from 'react-icons/ai';
import {RiDeleteBin4Fill} from 'react-icons/ri';

import FormatPrice from '../../../helper/FormatPrice';
import productApi from '../../../service/productApi';
import AdminModal from '../AdminModal';
import {AdminButton} from '../common';

import LoadingActionPage from '../../common/LoadingPage';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';

import Cookies from 'js-cookie';
import {getProductByNameAsync} from '../../../store/product/productAsynAction';
import CopyProductSlug from './copyProductSlug';
import stringToSlug from '../../../helper/stringToSlug';
const accessToken = Cookies.get('accessToken');

export default function ProductItem({product, handleClickEditProduct}: any) {
   const dispatch = useDispatch();
   const [isShowLoading, setIsShowLoading] = useState(false);
   const [isShowModalDelete, setIsShowModalDelete] = useState(false);

   const sizeAndQuantity = Object.keys(product.size).map((item) => ({
      size: item,
      quantity: product.size[item],
   }));

   // delete product
   async function handleDeleteProduct() {
      setIsShowLoading(true);

      const productId = product.productID;

      Promise.all(productId.map((id) => productApi.deleteProduct(accessToken, id))).then((res) => {
         setIsShowLoading(false);

         if (res.some((item) => item >= 400)) {
            toast.error('có lỗi xảy ra, vui lòng kiểm tra lại tên sản phẩm, hoặc kết nối mạng');
         } else {
            setIsShowModalDelete(false);
            dispatch(getProductByNameAsync());
         }
      });
   }

   return (
      <>
         {/* product avatar */}
         <div className='relative group'>
            <div className='absolute top-1 right-1 opacity-90 z-[50]'>
               <CopyProductSlug text={`/product/${stringToSlug(product.name)}`} />
            </div>

            <div className=' grid grid-row-2 '>
               {/* <img src='' alt='Hình ảnh sản phẩm avatar' /> */}
               <img
                  src={product?.pictures ? product?.pictures[0] : ''}
                  alt='Prodcut avatar'
                  className='h-auto w-full'></img>

               {/* product imag list */}
               <div className='flex gap-1 mt-1 w-full overflow-auto'>
                  {product?.pictures?.length > 0 &&
                     product.pictures
                        .slice(1, product.pictures.length)
                        .map((img) => (
                           <img
                              key={img}
                              src={img}
                              className='h-[150px] object-cover'
                              alt='Hình ảnh sản phẩm chi tiết'
                           />
                        ))}
               </div>
            </div>

            <div>
               <p className='font-bold'>{product.name}</p>
               <p>
                  <FormatPrice price={product.price} />
               </p>
               <div className='flex gap-2'>
                  {sizeAndQuantity.map((item, index) => (
                     <div key={index}>
                        <span className='font-bold'>{item.size}</span>
                        <span>:</span>
                        <span>{item.quantity}</span>
                     </div>
                  ))}
               </div>

               <div className='flex gap-2 mt-2'>
                  {product.colorList
                     .toString()
                     .split(',')
                     .map((color, index) => (
                        <div
                           key={index}
                           className='w-[40px] h-[20px]'
                           style={{backgroundColor: `${color}`}}></div>
                     ))}
               </div>
            </div>
         </div>

         <div className='flex justify-between mt-2'>
            <AdminButton
               // pending function update product
               // click={() => handleClickEditProduct(product)}
               click={() =>
                  toast.info('Tính năng này đang được phát triển, vui lòng xóa sản phẩm và tạo lại')
               }
               className='py-[4px] w-[80px] flex justify-center bg-gray-600 hover:bg-gray-400'>
               <AiTwotoneEdit fontSize='1rem' />
               Edit
            </AdminButton>
            <AdminButton
               click={() => setIsShowModalDelete(true)}
               className='py-[4px] w-[80px] flex justify-center'
               type='delete'>
               <RiDeleteBin4Fill fontSize='1.5rem' />
               Delete
            </AdminButton>
         </div>

         {isShowModalDelete && (
            <AdminModal
               ok={handleDeleteProduct}
               cancel={() => setIsShowModalDelete(false)}
               title={`Bạn có muốn xóa sản phẩm: ${product.name}`}></AdminModal>
         )}

         {isShowLoading && <LoadingActionPage />}
      </>
   );
}
