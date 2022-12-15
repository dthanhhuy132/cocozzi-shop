import {useState} from 'react';

import {AiOutlinePlusCircle} from 'react-icons/ai';
import {AdminLayout} from '../../components/Admin';
import {AdminButton} from '../../components/Admin/common';
import {ProductItem, ProductTab} from '../../components/Admin/Product';
import productApi from '../../service/productApi';

export default function AdminProductPage({productList}) {
   console.log('productList fe la gi', productList);

   const [tabActive, setTabActive] = useState('Product Banner');

   // function productBanner
   // function productStory
   // function productNormal

   return (
      <AdminLayout>
         {/* tab */}
         <div className='mb-5'>
            <ProductTab tabActive={tabActive} setTabActive={setTabActive}></ProductTab>
         </div>

         {/* Product */}
         {tabActive === 'Product' && (
            <>
               <div className='flex gap-10 items-center'>
                  <AdminButton click={() => {}}>
                     <AiOutlinePlusCircle /> Create new Product
                  </AdminButton>
               </div>

               {/* product list header */}
               <div className='mt-5 flex items-center gap-10'>
                  <p className='text-2xl font-semibold'>Product list</p>
                  <input
                     placeholder='Tìm kiếm sản phẩm...'
                     className='border-2 rounded-lg p-1 min-w-[300px]'></input>
               </div>

               {/* product list list item */}
               <div className='grid grid-cols-4 gap-10 mt-5'>
                  {productList.length > 0 &&
                     productList.map((product) => (
                        <ProductItem key={product.id} product={product}></ProductItem>
                     ))}
               </div>
            </>
         )}
      </AdminLayout>
   );
}

export const getServerSideProps = async () => {
   const productRes = await productApi.getAllProduct();

   return {
      props: {
         productList: productRes.data.data || [],
      },
   };
};
