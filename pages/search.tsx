import {useEffect} from 'react';
import {useRouter} from 'next/router';

import {GetStaticProps, GetStaticPaths, GetServerSideProps} from 'next';
import {ProductItem} from '../components/ProductItem';

import img1 from '../public/images/shop/1.webp';
import img2 from '../public/images/shop/2.webp';
import img3 from '../public/images/shop/3.webp';
import img4 from '../public/images/shop/4.webp';
import img5 from '../public/images/shop/5.webp';
import img6 from '../public/images/shop/6.webp';
import img7 from '../public/images/shop/7.webp';
import img8 from '../public/images/shop/8.webp';
const imgArr = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function SearchPage() {
   const router = useRouter();
   const searchStr = router.query.q;

   useEffect(() => {
      if (!searchStr) {
         router.push('/');
      }
   }, [searchStr]);

   return (
      <div className='max-w-[1200px] flex items-center flex-col mx-[auto] my-10'>
         <p className='mb-5'>
            Đã tìm thấy 10 sản phẩm với từ khoá
            <span className='font-semibold'> {searchStr}</span>
         </p>
         <div className='px-1 md:px-0 grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-5'>
            {imgArr.map((img, index) => (
               <ProductItem
                  key={index}
                  img={img}
                  displayPrice={true}></ProductItem>
            ))}
         </div>
      </div>
   );
}

// export const getServerSideProps: GetServerSideProps<any> = async (context) => {
//    const query = context.query.q || '';

//    try {
//       let listProductSearch = [];
//       return {
//          props: {
//             listProductSearch,
//             error: false,
//          },
//       };
//    } catch (error) {
//       return {
//          props: {
//             error: true,
//          },
//       };
//    }
// };
