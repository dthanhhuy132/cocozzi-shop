import {useRouter} from 'next/router';
import SliderSlick from 'react-slick';

import {ProductItem} from '../ProductItem';

import img1 from '../../public/images/shop/1.webp';
import img2 from '../../public/images/shop/2.webp';
import img3 from '../../public/images/shop/3.webp';
import img4 from '../../public/images/shop/4.webp';
import img5 from '../../public/images/shop/5.webp';
import img6 from '../../public/images/shop/6.webp';
import img7 from '../../public/images/shop/7.webp';
import img8 from '../../public/images/shop/8.webp';
import useWindowDimensions from '../../hooks/UseWindowDimensions';
const imgArr = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function ShopSliderProduct() {
   const {isMobile} = useWindowDimensions();
   const settings = {
      className: 'center w-full',
      infinite: true,
      centerPadding: '60px',
      slidesToShow: isMobile ? 3 : 4,
      swipeToSlide: true,
      autoplay: true,
      lazyLoad: 'progressive',
   };

   return (
      <SliderSlick {...settings}>
         {imgArr.map((img, index) => (
            <ProductItem img={img} key={index}></ProductItem>
         ))}
      </SliderSlick>
   );
}
