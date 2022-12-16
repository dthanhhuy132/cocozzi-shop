import Image from 'next/image';
import {useState} from 'react';
import {AiTwotoneEdit} from 'react-icons/ai';
import {RiDeleteBin4Fill} from 'react-icons/ri';

import FormatPrice from '../../../helper/FormatPrice';
import productApi from '../../../service/productApi';
import AdminModal from '../AdminModal';
import {AdminButton} from '../common';

import Cookies from 'js-cookie';
import LoadingActionPage from '../../common/LoadingPage';

export default function ProductItem({product}: any) {
   console.log('productItem la gi', product);
   const accessToken = Cookies.get('accessToken');
   const [isShowLoading, setIsShowLoading] = useState(false);
   const [isShowModalDelete, setIsShowModalDelete] = useState(false);

   const sizeAndQuantity = Object.keys(product.size).map((item) => ({
      size: item,
      quantity: product.size[item],
   }));

   async function handleDeleteProduct() {
      // setIsShowLoading(true);
      const productId = product.productID;

      let res = Promise.all(
         productId.forEach((id) => productApi.deleteProduct(accessToken, id))
      ).then((res) => console.log('res la gi', res));
   }

   return (
      <>
         {/* product avatar */}
         <div className='grid grid-row-2 '>
            {/* <img src='' alt='Hình ảnh sản phẩm avatar' /> */}
            <img src={product.pictures[0]} alt='Prodcut avatar' className='h-auto w-full'></img>

            {/* product imag list */}
            <div className='flex gap-1 mt-1 w-full overflow-scroll'>
               {product.pictures.length > 0 &&
                  product.pictures
                     .slice(1, product.pictures.length)
                     .map((img, index) => (
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
            {/* <p className='italic'>{product.description}</p> */}
            <p>
               <FormatPrice price={product.price} />
            </p>
            <div className='flex gap-2'>
               {sizeAndQuantity.map((item) => (
                  <div>
                     <span className='font-bold'>{item.size}</span>
                     <span>:</span>
                     <span>{item.quantity}</span>
                  </div>
               ))}
            </div>
            <p></p>
         </div>

         <div className='flex justify-between mt-2'>
            <AdminButton click={() => {}} className='py-[4px] w-[80px] flex justify-center'>
               <AiTwotoneEdit fontSize='1rem' />
               Edit
            </AdminButton>
            <AdminButton
               click={() => setIsShowModalDelete(true)}
               className='py-[4px] w-[80px] flex justify-center bg-red-800 hover:bg-red-700'>
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
