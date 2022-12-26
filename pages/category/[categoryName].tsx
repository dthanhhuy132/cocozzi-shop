import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import stringToSlug from '../../helper/stringToSlug';
import categoryApi from '../../service/categoryApi';
import {useAppDispatch, useAppSelector} from '../../store';
import {getProductByNameAsync} from '../../store/product/productAsynAction';
import {ShopProduct} from '../../components/Shop';

export default function CategoryProductPage({categoryList}) {
   // flow:
   // 1.
   const router = useRouter();
   const dispatch = useAppDispatch();
   const categroyName = router.query.categoryName as string;
   const categroyNameSlug = categroyName.split('-').slice(0, -1).join('-');

   // find category by slug name => get product by this category
   const matchCategory = categoryList?.filter(
      (product) => stringToSlug(product.name).split('-').slice(0, -1).join('-') == categroyNameSlug
   )[0];
   const categoryId = matchCategory._id;
   const categoryName = matchCategory.name;

   const {productListState} = useAppSelector((state) => state.product);
   const [renderProductByCategory, setRenderProductByCategory] = useState([]);

   useEffect(() => {
      dispatch(getProductByNameAsync());
   }, [router.pathname, categroyNameSlug]);

   useEffect(() => {
      if (productListState) {
         const productByCategory = productListState?.filter((product) => {
            return product.categoryId === categoryId;
         });
         setRenderProductByCategory(productByCategory);
      }
   }, [productListState, router.pathname, categroyNameSlug]);
   return (
      <div className='w-full px-2 md:w-3/4 md:mx-auto my-10'>
         <div className='sticky top-[40px] md:top-[50px] mt-5 font-bold border-b-2 z-[9] bg-white py-3'>
            Phân loại: {categoryName} ({renderProductByCategory.length})
         </div>
         {renderProductByCategory.length > 0 ? (
            <div className='mt-[40px] md:mt-[30px] min-h-[100vh] shop-item mb-[50px]'>
               <ShopProduct productListByName={renderProductByCategory} />
            </div>
         ) : (
            <>Không có sản phẩm liên quan</>
         )}
      </div>
   );
}

export const getServerSideProps = async () => {
   let categoryList;
   try {
      const categoryRes = await categoryApi.getAllCategory();
      const categoryData = categoryRes?.data?.data;
      // promoList = categoryList.filter((item) => item);
      categoryList = categoryData.filter(
         (cate) =>
            cate.status == true &&
            (cate?.description?.indexOf('-category-for-promo') < 0 || !cate?.description)
      );
   } catch (error) {}

   return {
      props: {
         categoryList: categoryList || [],
      },
   };
};
