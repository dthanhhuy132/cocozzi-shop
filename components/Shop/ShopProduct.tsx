import useWindowDimensions from '../../hooks/UseWindowDimensions';

import img1 from '../../public/images/shop/1.webp';
import img2 from '../../public/images/shop/2.webp';
import img3 from '../../public/images/shop/3.webp';
import img4 from '../../public/images/shop/4.webp';
import img5 from '../../public/images/shop/5.webp';
import img6 from '../../public/images/shop/3.webp';
import img7 from '../../public/images/shop/7.webp';
import img8 from '../../public/images/shop/8.webp';
import {ProductItem} from '../ProductItem';
const imgArr = [
   img1,
   img2,
   img3,
   img4,
   img5,
   img6,
   img7,
   img8,
   img1,
   img2,
   img3,
   img4,
   img5,
   img6,
   img7,
   img8,
   img6,
   img7,
   img8,
   img1,
   img2,
   img3,
   img4,
   img5,
   img6,
   img7,
   img8,
];
import Masonry from 'react-masonry-css';
import {useEffect, useState} from 'react';

export default function ShopProduct() {
   const {isMobile} = useWindowDimensions();
   const [isMobileDevice, setIsMobileDevice] = useState(false);
   useEffect(() => {
      if (isMobile) {
         setIsMobileDevice(true);
      } else setIsMobileDevice(false);
   }, [isMobile]);
   return (
      <>
         {!isMobileDevice ? (
            <div className='grid grid-cols-1 md:grid-cols-5 gap-y-6 gap-x-6'>
               {imgArr.map((img, index) => (
                  <ProductItem key={index} img={img} displayPrice={true}></ProductItem>
               ))}
            </div>
         ) : (
            <Masonry
               breakpointCols={2}
               className='my-masonry-grid'
               columnClassName='my-masonry-grid_column'>
               {imgArr.map((img, index) => (
                  <ProductItem key={index} img={img} displayPrice={true}></ProductItem>
               ))}
            </Masonry>
         )}
      </>
   );
}
