import {useMemo} from 'react';

import useWindowDimensions from '../../hooks/UseWindowDimensions';

import Masonry from 'react-masonry-css';
import {useEffect, useState} from 'react';
import {useAppSelector} from '../../store';
import {ProductItem} from '../ProductItem';

export default function ShopProduct() {
   const {isMobile} = useWindowDimensions();
   const [isMobileDevice, setIsMobileDevice] = useState(false);
   const {productListByGroupNameState} = useAppSelector((state) => state.product);

   const normalProductList = useMemo(
      () =>
         productListByGroupNameState.filter((product) => product.productType === 'normal-product'),
      [productListByGroupNameState]
   );
   console.log('productListByGroupNameState la gi', productListByGroupNameState);

   useEffect(() => {
      if (isMobile) {
         setIsMobileDevice(true);
      } else setIsMobileDevice(false);
   }, [isMobile]);
   return (
      <>
         <Masonry
            breakpointCols={isMobileDevice ? 2 : 5}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'>
            {normalProductList.map((product) => (
               <ProductItem product={product} key={product.name}></ProductItem>
            ))}
         </Masonry>
      </>
   );
}
