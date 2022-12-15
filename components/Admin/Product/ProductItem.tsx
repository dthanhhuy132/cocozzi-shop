import Image from 'next/image';
import React from 'react';
import FormatPrice from '../../../helper/formatPrice';

type Props = {};

export default function ProductItem({product}: any) {
   return (
      <div>
         {/* product avatar */}
         <div className='grid grid-row-2'>
            {/* <img src='' alt='Hình ảnh sản phẩm avatar' /> */}
            <Image
               src='/images/shop/11.webp'
               layout='responsive'
               objectFit='cover'
               width='500px'
               height='200px'
               alt='Hình ảnh sản phẩm chi tiết'
            />

            {/* product imag list */}
            <div className='flex gap-1 mt-1'>
               {product.pictures.length > 0 &&
                  product.pictures.map((img, index) => (
                     <div key={index}>
                        <img
                           src='/images/shop/11.webp'
                           width='50px'
                           height='100px'
                           alt='Hình ảnh sản phẩm chi tiết'
                        />
                     </div>
                  ))}
            </div>
         </div>

         <div>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>
               <FormatPrice price={product.price} />
            </p>
         </div>
      </div>
   );
}
