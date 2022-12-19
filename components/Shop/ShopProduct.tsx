import {useMemo} from 'react';

import useWindowDimensions from '../../hooks/UseWindowDimensions';

import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';

import {ProductItem} from '../ProductItem';

export default function ShopProduct({productListByName}: any) {
   const {isMobile, width} = useWindowDimensions();

   return (
      <>
         <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 750: 4, 900: 5}}>
            <Masonry
               className='my-masonry-grid'
               columnClassName='my-masonry-grid_column'
               gutter='40px 10px'>
               {productListByName.map((product, index) => (
                  <ProductItem product={product} key={index}></ProductItem>
               ))}
            </Masonry>
         </ResponsiveMasonry>
      </>
   );
}
