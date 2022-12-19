import {useMemo} from 'react';

import useWindowDimensions from '../../hooks/UseWindowDimensions';

import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';

import {useEffect, useState} from 'react';
import {useAppSelector} from '../../store';
import {ProductItem} from '../ProductItem';
import productApi from '../../service/productApi';
import filterProductActive from '../../helper/filterProductActive';

export default function ShopProduct({productListByName}: any) {
   const {isMobile, width} = useWindowDimensions();

   return (
      <>
         <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 750: 4, 900: 5}}>
            <Masonry
               breakpointCols={width > 600 ? 5 : 2}
               className='my-masonry-grid'
               columnClassName='my-masonry-grid_column'>
               {productListByName.map((product, index) => (
                  <ProductItem product={product} key={index}></ProductItem>
               ))}
            </Masonry>
         </ResponsiveMasonry>
      </>
   );
}
