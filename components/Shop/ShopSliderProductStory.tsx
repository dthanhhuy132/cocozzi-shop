import {useRouter} from 'next/router';
import SliderSlick from 'react-slick';
import {AiOutlineCloseCircle} from 'react-icons/ai';

import img1 from '../../public/images/shop/1.webp';
import img2 from '../../public/images/shop/2.webp';
import img3 from '../../public/images/shop/3.webp';
import img4 from '../../public/images/shop/4.webp';
import img5 from '../../public/images/shop/5.webp';
import img6 from '../../public/images/shop/6.webp';
import img7 from '../../public/images/shop/7.webp';
import img8 from '../../public/images/shop/8.webp';
import useWindowDimensions from '../../hooks/UseWindowDimensions';

import {useCallback, useEffect, useState} from 'react';
import Image from 'next/image';

const imgArr = [img1, img2, img3, img4, img5, img6, img7, img8];
export default function ShopSliderProductStory() {
   const router = useRouter();
   const {isMobile} = useWindowDimensions();
   const [isShowCenterMode, setIsShowCenterMode] = useState(false);

   const [currentIndexSlickCenter, setCurrentIndexSlickCenter] = useState(0);
   const [isShowProductButton, setIsShowProductButton] = useState(false);
   //    beforeChange={}

   const [dragging, setDragging] = useState(false);

   const handleBeforeChange = useCallback(() => {
      setDragging(true);
   }, [setDragging]);

   const handleAfterChange = useCallback(() => {
      setDragging(false);
   }, [setDragging]);

   const handleOnItemClick = useCallback(
      (e) => {
         if (dragging) e.stopPropagation();
      },
      [dragging]
   );

   const [sliderQuantity, setSliderQuantity] = useState(3);

   useEffect(() => {
      if (isMobile) {
         setSliderQuantity(1.5);
      } else {
         setSliderQuantity(4);
      }
   }, [isMobile]);

   function getSlickCenter() {
      const slickCenterEl = document.querySelector('.slick-custom-center-dth .slick-center');
   }

   const settings = {
      className: 'center w-full',
      centerPadding: 0,

      infinite: true,
      slidesToShow: sliderQuantity,
      swipeToSlide: true,
      autoplay: true,

      prevArrow: false,
      nextArrow: false,
   };

   const openSetting = {
      className: 'center w-full slick-custom-center-dth',
      infinite: true,
      slidesToShow: isMobile ? 1 : 3,
      swipeToSlide: true,
      autoplay: false,

      centerMode: true,
      centerPadding: 0,

      beforeChange: (currentSlide) => {
         getSlickCenter();
         setCurrentIndexSlickCenter(currentSlide);
         setIsShowProductButton(false);
      },

      afterChange: () => {
         setIsShowProductButton(true);
      },
   };

   return (
      <>
         <SliderSlick
            {...settings}
            beforeChange={handleBeforeChange}
            afterChange={handleAfterChange}
            centerMode={true}>
            {imgArr.map((img, index) => (
               <div key={index} onClickCapture={handleOnItemClick}>
                  <div className='p-[2px] md:px-2 transition'>
                     <div className='relative cursor-pointer rounded-[12px] md:rounded-[16px] overflow-hidden'>
                        <Image
                           className='absolute top-0 left-0 w-full transition hover:scale-[1.1] cursor-pointer'
                           src={img}
                           alt=''
                           width={9}
                           height={16}
                           layout='responsive'
                           objectFit='cover'
                           onClick={() => setIsShowCenterMode(true)}
                        />
                     </div>
                  </div>
               </div>
            ))}
         </SliderSlick>

         {isShowCenterMode && (
            <div
               className={`animate__animated animate__fadeIn flex justify-center items-center fixed top-0 bottom-0 right-0 z-[999] left-0 bg-[#000000fa] transition-all`}>
               <div
                  className='absolute top-2 left-2 z-[100] text-[gray] text-[3rem] cursor-pointer hover:text-[white]'
                  onClick={() => setIsShowCenterMode(false)}>
                  <AiOutlineCloseCircle />
               </div>
               <div className='w-[79%] mb-10'>
                  <SliderSlick {...openSetting} centerMode={true}>
                     {imgArr.map((img, index) => (
                        <div key={index} className=''>
                           <div className='p-[10px] text-center md:px-[30px] lg:px-[50px] transition'>
                              <div className='relative rounded-[12px] md:rounded-[16px] overflow-hidden'>
                                 <Image
                                    className='absolute top-0 left-0 w-full transition'
                                    src={img}
                                    alt=''
                                    width={9}
                                    height={16}
                                    layout='responsive'
                                    objectFit='cover'
                                 />
                              </div>
                           </div>
                        </div>
                     ))}
                  </SliderSlick>
                  <button
                     className={`absolute left-[50%] translate-x-[-50%] bg-[white] rounded-full mt-2 px-2 py-1 flex items-center text-[1.1rem] transition-all ${
                        isShowProductButton ? 'bottom-[10px]' : 'bottom-[-100%]'
                     }`}
                     onClick={() => router.push('/product/123')}>
                     Xem sản phẩm
                  </button>
               </div>
            </div>
         )}
      </>
   );
}
