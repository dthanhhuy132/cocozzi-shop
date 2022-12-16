import {useState} from 'react';

import {AiOutlinePlusCircle} from 'react-icons/ai';
import {AdminLayout, AdminModal} from '../../components/Admin';
import {AdminButton} from '../../components/Admin/common';
import {ProductItem, ProductTab} from '../../components/Admin/Product';
import ModalCreateProduct from '../../components/Admin/Product/ModalCreateProduct';
import categoryApi from '../../service/categoryApi';
import productApi from '../../service/productApi';

export default function AdminProductPage({productList, categoryList}) {
   console.log('productList fe la gi', productList);

   // get product with status true

   const [tabActive, setTabActive] = useState('Product Banner');
   const [isShowModalNormalProduct, setIsShowModalNormalProduct] = useState(false);
   const [isShowModalStoryProduct, setIsShowModalStoryProduct] = useState(false);
   const [isShowModalBannerProduct, setIsShowModalBannerProduct] = useState(false);
   // function productBanner
   // function productStory
   function productNormal(newNormalProduct) {
      console.log('newNormalProduct la gi', newNormalProduct);
   }

   return (
      <AdminLayout>
         {/* tab */}
         <div className='mb-5'>
            <ProductTab tabActive={tabActive} setTabActive={setTabActive}></ProductTab>
         </div>

         {/* Product */}
         {tabActive === 'Product' && (
            <div>
               <div className='flex gap-10 items-center'>
                  <AdminButton click={() => setIsShowModalNormalProduct(true)}>
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
                        <div className='border-[1px] p-1'>
                           <ProductItem key={product.id} product={product}></ProductItem>
                        </div>
                     ))}
               </div>
            </div>
         )}

         {/* modal create normal product */}
         {isShowModalNormalProduct && (
            <AdminModal title='Create new Product' showFooter={false} className='w-[800px] pb-2'>
               <ModalCreateProduct
                  cancel={() => setIsShowModalNormalProduct(false)}
                  createProdcut={productNormal}
                  categoryList={categoryList}
               />
            </AdminModal>
         )}

         {isShowModalStoryProduct && (
            <AdminModal title='Create new Product' showFooter={false} className='w-[800px] pb-2'>
               <ModalCreateProduct
                  cancel={() => setIsShowModalNormalProduct(false)}
                  // handleCreateEvent={handleCreateEvent}
                  categoryList={categoryList}
               />
            </AdminModal>
         )}
      </AdminLayout>
   );
}

export const getServerSideProps = async () => {
   const productList = [];
   const productRes = await productApi.getAllProductByName();
   const categoryRes = await categoryApi.getAllCategory();

   const productListByName = productRes?.data?.data;
   const activeProduct = productListByName
      .map((product) => {
         const productItem = product.data;
         return {
            name: product.name.name,
            data: productItem.filter((item) => item.status !== false),
         };
      })
      .filter((product) => product.data.length > 0)
      .map((product) => {
         const size = {};
         const sizeID = {};
         product.data.forEach((item) => {
            size[item.size] = item.quantity;
            sizeID[item.size] = item._id;
         });
         return {
            name: product.name,
            size: size,
            sizeID: sizeID,
            productID: product.data.map((item) => item._id),
            pictures: product.data[0].pictures,
            price: product.data[0].price,
            description: product.data[0].description,
            colorList: product.data[0].colorList,
         };
      });

   return {
      props: {
         productList: activeProduct || [],
         categoryList:
            categoryRes?.data?.data.map((category) => ({name: category.name, id: category._id})) ||
            [],
      },
   };
};
