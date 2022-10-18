import Image from 'next/image';
import {useRouter} from 'next/router';
import SliderSlick from 'react-slick';

export default function Slider({imgArr = []}) {
   const settings = {
      className: 'center w-full',
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 4,
      swipeToSlide: true,
      autoplay: true,
      lazyLoad: 'progressive',
   };

   const router = useRouter();

   return (
      <SliderSlick {...settings}>
         {imgArr.map((img, index) => (
            <div key={index} className='px-2 uppercase hover:cursor-pointer'>
               <div>
                  <a onClick={() => router.push('/product/123')}>
                     <Image src={img} alt='' />
                  </a>
               </div>
               <h3>Product name</h3>
               <p>$50</p>
            </div>
         ))}
      </SliderSlick>
   );
}
