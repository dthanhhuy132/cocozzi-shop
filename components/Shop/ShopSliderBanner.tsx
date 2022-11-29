import ImageGallery from 'react-image-gallery';

import Link from 'next/link';
import useWindowDimensions from '../../hooks/UseWindowDimensions';

const imgArr = [
   '/images/shop/1.webp',
   '/images/shop/2.webp',
   '/images/shop/3.webp',
   '/images/shop/4.webp',
   '/images/shop/5.webp',
   '/images/shop/6.webp',
   '/images/shop/7.webp',
   '/images/shop/8.webp',
];

const images = imgArr.map((item) => ({
   original: item,
   thumbnail: item,
}));

export default function ShopSliderBanner() {
   const {isMobile} = useWindowDimensions();
   return (
      <ImageGallery
         items={images}
         showIndex={isMobile ? true : false}
         showBullets={isMobile ? false : true}
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
