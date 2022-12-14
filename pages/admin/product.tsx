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
import {useAppDispatch, useAppSelector} from '../../store';
import {getProductByNameAsync} from '../../store/product/productAsynAction';
import {toast} from 'react-toastify';
import AdminProductStory from '../../components/Admin/Product/AdminProductStory';
import panelApi from '../../service/panelApi';
import {PANEL_FOR_STORY} from '../../store/panel/panelSlice';
import sortDataByUpdatedTime from '../../components/Admin/common/sortDataByUpdatedTime';

export default function AdminProductPage({productList, categoryList, storyList}) {
   const accessToken = Cookies.get('accessToken');
   console.log('storyList', storyList);

   const [productEditing, setProductEditing] = useState(null);
   const [isShowLoading, setIsShowLoading] = useState(false);

   const [renderProductList, setRenderProductList] = useState(sortDataByUpdatedTime(productList));

   const {productListState} = useAppSelector((state) => state.product);

   const [isShowModalCreatelProduct, setIsShowModalCreateProduct] = useState(false);

   const dispatch = useAppDispatch();

   // create and update product function
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
         changeImageUpload,
         sizeProductWithID,
      } = newNormalProduct;

      // Ch???nh s???a s???n ph???m ??ang ???????c ph??t tri???n
      if (productId) {
         const sizeQuantityMap = Object.keys(sizeQuantity)
            .map((item) => ({
               size: item,
               quantity: sizeQuantity[item],
               pruductId: sizeProductWithID[item] || null,
            }))
            .filter((item) => item.quantity !== '');

         // Ch???nh s???a l???i: id s???n ph???m, s??? l?????ng, size
         // new khoong cos size -> tajo moiw sanr phama

         // ch???nh s???a s???n ph???m
         if (changeImageUpload == true) {
            // thay ?????i h??nh s???nh s???n ph???m
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

                  const id = item.pruductId;

                  return productApi.updateProduct(accessToken, id, formData).then((res) => {
                     return res.status;
                  });
               })
            ).then((res) => {
               setIsShowLoading(false);

               if (res.some((item: any) => item >= 400)) {
                  toast.error(
                     'c?? l???i x???y ra, vui l??ng ki???m tra l???i t??n s???n ph???m, ho???c k???t n???i m???ng'
                  );
               } else {
                  setIsShowModalCreateProduct(false);
                  dispatch(getProductByNameAsync());
               }
            });
         }
         if (changeImageUpload == false) {
            setIsShowLoading(true);
            // kh??ng thay ?????i h??nh ???nh s???n ph???m

            Promise.all(
               sizeQuantityMap.map((item) => {
                  const id = item.pruductId;
                  return sizeQuantityMap.map((item) => {
                     const formData = {
                        name,
                        description,
                        price,
                        categoryId,
                        colorList,
                        size: item.size,
                        quantity: item.quantity,
                     };

                     return productApi.updateProduct(accessToken, id, formData).then((res) => {
                        return res.status;
                     });
                  });
               })
            ).then((res) => {
               setIsShowLoading(false);

               if (res.some((item: any) => item >= 400)) {
                  toast.error(
                     'c?? l???i x???y ra, vui l??ng ki???m tra l???i t??n s???n ph???m, ho???c k???t n???i m???ng'
                  );
               } else {
                  setIsShowModalCreateProduct(false);
                  dispatch(getProductByNameAsync());
               }
            });
         }
      }
      // ------------------------------------------------> T???O M???I S???N PH???M
      if (!productId) {
         const sizeQuantityMap = Object.keys(sizeQuantity)
            .map((item) => ({
               size: item,
               quantity: sizeQuantity[item],
            }))
            .filter((item) => item.quantity !== '');

         const checkSize = Object.values(sizeQuantity).filter((item) => Number(item) > 0);

         if (!checkSize.every((item) => Number(item) > 0) || checkSize.length == 0) {
            toast.error('Vui l??ng nh???p s??? l?????ng cho t???ng size, s??? l?????ng > 0');
         }
         // t???o s???n ph???m m???i

         if (checkSize.length > 0 && checkSize.every((item) => Number(item) > 0)) {
            setIsShowLoading(true);

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

                  return productApi.createNewProduct(accessToken, formData).then((res) => {
                     return res.status;
                  });
               })
            ).then((res) => {
               setIsShowLoading(false);
               if (res.some((item: any) => item >= 400)) {
                  toast.error(
                     'c?? l???i x???y ra, vui l??ng ki???m tra l???i t??n s???n ph???m, ho???c k???t n???i m???ng'
                  );
               } else {
                  dispatch(getProductByNameAsync());
                  setIsShowModalCreateProduct(false);
               }
            });
         }
      }
   }

   function handleClickEditProduct(editProduct) {
      setIsShowModalCreateProduct(true);
      setProductEditing(editProduct);
   }

   // reset editting product when modal create product close
   useEffect(() => {
      if (!isShowModalCreatelProduct) {
         setProductEditing(null);
      }
   }, [isShowModalCreatelProduct]);

   // update productlist when add new or edit product
   useEffect(() => {
      if (productListState) {
         const sortProductListState = sortDataByUpdatedTime(productListState);
         setRenderProductList(sortProductListState);
      }
   }, [productListState]);

   // update list product

   return (
      <AdminLayout>
         {/* tab */}

         {/* Product */}
         <div>
            {/* product list header */}

            {/* product list list item */}

            <div className='flex gap-10 items-center'>
               <AdminButton click={() => setIsShowModalCreateProduct(true)}>
                  <AiOutlinePlusCircle /> Create new product
               </AdminButton>
            </div>
            <div className='mt-5 flex items-center gap-10'>
               <p className='text-2xl font-semibold'>Product list</p>

               {/* t??m ki???m s???n ph???m */}
               <input
                  placeholder='T??m ki???m s???n ph???m...'
                  className='border-2 rounded-lg p-1 min-w-[300px]'
               />
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5'>
               {renderProductList.length > 0 &&
                  renderProductList.map((product, index) => (
                     <div
                        key={index}
                        className='flex justify-between flex-col border-[1px] rounded-md p-1'>
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
               title={`${productEditing ? 'Edit product' : 'Create new product'}`}
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
   //   panelList for story
   let productList, categoryList, storyList;

   try {
      const productRes = await productApi.getAllProductByName();
      const categoryRes = await categoryApi.getAllCategory();
      const panelRes = await panelApi.getAllPanel();

      const categoryData = categoryRes?.data?.data;
      const productListByName = productRes?.data?.data;
      const panelData = panelRes?.data?.data;

      // get category for product (#category for promo)
      categoryList = categoryData
         .filter(
            (cate) =>
               cate.status == true &&
               (cate?.description?.indexOf('-category-for-promo') < 0 || !cate?.description)
         )
         .map((category) => ({
            name: category.name,
            id: category._id,
         }));

      productList = filterProductActive(productListByName);
      storyList = panelData.filter((item) => item.description.indexOf(PANEL_FOR_STORY) >= 0);

      // promoList = categoryList.filter((item) => item);
   } catch (error) {}

   return {
      props: {
         productList: productList || [],
         categoryList: categoryList || [],
         storyList: storyList || [],
      },
   };
};
