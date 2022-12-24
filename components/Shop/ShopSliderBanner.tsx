import ImageGallery from 'react-image-gallery';

import Link from 'next/link';
import useWindowDimensions from '../../hooks/UseWindowDimensions';
import {useEffect, useState} from 'react';

export default function ShopSliderBanner() {
   const {isMobile} = useWindowDimensions();
   const [isShowBulletAndIndex, setIsShowBulletAndIndex] = useState(false);

   useEffect(() => {
      if (isMobile) {
         setIsShowBulletAndIndex(false);
      } else {
         setIsShowBulletAndIndex(true);
      }
   }, [isMobile]);

   return (
      <ImageGallery
         // items={images}
         showIndex={isShowBulletAndIndex}
         showBullets={isShowBulletAndIndex}
         infinite={true}
         autoPlay={true}
         fullscreen={true}
         showNav={true}
         showFullscreenButton={false}
         showThumbnails={false}
         showPlayButton={false}
         additionalClass='shop-slider'
      />
   );
}
