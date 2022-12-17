import {time} from 'console';
import {useState, useEffect} from 'react';

import {AiOutlinePlusCircle} from 'react-icons/ai';
import {AdminLayout, AdminModal} from '../../components/Admin';
import {AdminButton} from '../../components/Admin/common';
import {ProductItem, ProductTab} from '../../components/Admin/Product';
import ModalCreateProduct from '../../components/Admin/Product/ModalCreateProduct';
import categoryApi from '../../service/categoryApi';
import productApi from '../../service/productApi';

import Cookies from 'js-cookie';
import filterProductActive from '../../helper/filterProductActive';
import LoadingActionPage from '../../components/common/LoadingPage';

export default function AdminProductPage({productList, categoryList}) {
   const accessToken = Cookies.get('accessToken');
   const [productEditing, setProductEditing] = useState(null);
   const [tabActive, setTabActive] = useState('Product Banner');
   const [isShowLoading, setIsShowLoading] = useState(false);
   const [renderProductList, setRenderProdcutList] = useState(
      productList.filter((product) => product.productType === 'normal-product')
   );

   const [productType, setProductType] = useState('normal-product');

   const [isShowModalCreatelProduct, setIsShowModalCreateProduct] = useState(false);

   // function productBanner
   // function productStory
   function createUpdateProduct(newNormalProduct) {
      const {
         name,
         description,
         price,
         categoryId,
         colorList,
         productAvatar,
         productPictures,
         sizeQuantity,
         productId,
      } = newNormalProduct;

      const sizeQuantityMap = Object.keys(sizeQuantity)
         .map((item) => ({
            size: item,
            quantity: sizeQuantity[item],
         }))
         .filter((item) => item.quantity !== '');

      if (productId) {
         console.log('productType la gi', productType);
         console.log('productAvatar trong chinh suwar', productAvatar);
         console.log('productPicture trong chinh suwar', productPictures);

         // chỉnh sửa sản phẩm
         Promise.all(
            productId.map((id) => {
               return sizeQuantityMap.map((item) => {
                  const formData = new FormData();

                  formData.append('name', name);
                  formData.append('idCategory', categoryId);
                  formData.append('description', description);
                  formData.append('pictures', productAvatar);
                  formData.append('price', price);

                  if (colorList.length == 1) {
                     formData.append('colorList[0]', colorList[0]);
                  }
                  if (colorList.length > 1) {
                     colorList.forEach((color) => formData.append('colorList', color));
                  }

                  productPictures.forEach((pic) => formData.append('pictures', pic));
                  formData.append('size', item.size);
                  formData.append('quantity', item.quantity);
                  formData.append('productType', productType);

                  // return productApi.updateProduct(accessToken, id, formData).then((res) => {
                  //    return res.status;
                  // });

                  return 1;
               });
            })
         ).then((res) => console.log('tao moi san pham voi res la gi', res));
      } else if (!productId) {
         // tạo mới sản phẩm
         console.log('productType la gi', productType);

         Promise.all(
            sizeQuantityMap.map((item) => {
               const formData = new FormData();

               formData.append('name', name);
               formData.append('idCategory', categoryId);
               formData.append('description', description);
               formData.append('pictures', productAvatar);
               formData.append('price', price);

               if (colorList.length == 1) {
                  formData.append('colorList[0]', colorList[0]);
               }
               if (colorList.length > 1) {
                  colorList.forEach((color) => formData.append('colorList', color));
               }

               productPictures.forEach((pic) => formData.append('pictures', pic));
               formData.append('size', item.size);
               formData.append('quantity', item.quantity);
               formData.append('productType', productType);

               // return productApi.createNewProduct(accessToken, formData).then((res) => {
               //    return res.status;
               // });

               return 1;
            })
         ).then((res) => console.log('tao moi san pham voi res la gi', res));
      }
   }

   function handleClickEditProduct(editProduct) {
      setIsShowModalCreateProduct(true);
      setProductEditing(editProduct);
   }

   // Change productList when change tabActive
   useEffect(() => {
      //  ['Product Banner', 'Product story', 'Product'];
      if (tabActive === 'Product story') {
         setRenderProdcutList(
            productList.filter((product) => product.productType == 'story-product')
         );
         setProductType('story-product');
      }
      if (tabActive === 'Product') {
         setRenderProdcutList(
            productList.filter((product) => product.productType == 'normal-product')
         );
         setProductType('normal-product');
      }
   }, [tabActive]);

   useEffect(() => {
      if (!isShowModalCreatelProduct) {
         setProductEditing(null);
      }
   }, [isShowModalCreatelProduct]);

   return (
      <AdminLayout>
         {/* tab */}
         <div className='mb-5'>
            <ProductTab tabActive={tabActive} setTabActive={setTabActive}></ProductTab>
         </div>

         {/* Product */}
         <div>
            <div className='flex gap-10 items-center'>
               <AdminButton click={() => setIsShowModalCreateProduct(true)}>
                  <AiOutlinePlusCircle /> Create new Product
               </AdminButton>
            </div>

            {/* product list header */}
            <div className='mt-5 flex items-center gap-10'>
               <p className='text-2xl font-semibold'>Product list</p>

               {/* tìm kiếm sản phẩm */}
               {/* <input
                  placeholder='Tìm kiếm sản phẩm...'
                  className='border-2 rounded-lg p-1 min-w-[300px]'/> */}
            </div>

            {/* product list list item */}
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5'>
               {renderProductList.length > 0 &&
                  renderProductList.map((product) => (
                     <div
                        key={product.id}
                        className='flex justify-between flex-col border-[1px] p-1'>
                        <ProductItem
                           product={product}
                           handleClickEditProduct={handleClickEditProduct}></ProductItem>
                     </div>
                  ))}
            </div>
         </div>

         {/* modal create normal product */}
         {isShowModalCreatelProduct && (
            <AdminModal
               title='Create new Product'
               showFooter={false}
               className='w-[800px] pb-2'
               cancel={() => setIsShowModalCreateProduct(false)}>
               <ModalCreateProduct
                  cancel={() => setIsShowModalCreateProduct(false)}
                  createUpdateProduct={createUpdateProduct}
                  categoryList={categoryList}
                  productEditing={productEditing}
               />
            </AdminModal>
         )}
         {isShowLoading && <LoadingActionPage />}
      </AdminLayout>
   );
}

export const getServerSideProps = async () => {
   const productRes = await productApi.getAllProductByName();
   const categoryRes = await categoryApi.getAllCategory();

   const productListByName = productRes?.data?.data;
   const activeProduct = filterProductActive(productListByName);

   return {
      props: {
         productList: activeProduct || [],
         categoryList:
            categoryRes?.data?.data.map((category) => ({name: category.name, id: category._id})) ||
            [],
      },
   };
};
