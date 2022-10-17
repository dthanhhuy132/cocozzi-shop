import Image from 'next/image';
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
   return (
      <SliderSlick {...settings}>
         {imgArr.map((img, index) => (
            <div key={index} className='px-2 uppercase hover:cursor-pointer'>
               <div>
                  <Image src={img} alt='' />
               </div>
               <h3>Product name</h3>
               <p>$50</p>
            </div>
         ))}
      </SliderSlick>
   );
}
