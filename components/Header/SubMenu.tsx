import {useEffect, useRef, useState, useCallback} from 'react';
import useGlobalState from '../../state';

import {BsArrowRightSquare} from 'react-icons/bs';

// test slider
import SliderSlick from 'react-slick';

import img1 from '../../public/images/shop/1.webp';
import img2 from '../../public/images/shop/2.webp';
import img3 from '../../public/images/shop/3.webp';
import img4 from '../../public/images/shop/4.webp';
import img5 from '../../public/images/shop/5.webp';
import img6 from '../../public/images/shop/6.webp';
import img7 from '../../public/images/shop/7.webp';
import img8 from '../../public/images/shop/8.webp';
import useWindowDimensions from '../../hooks/UseWindowDimensions';

import Image from 'next/image';
import {useRouter} from 'next/router';
import uppercaseFirstLetter from '../../helper/uppercaseFirstLetter';
import {useAppSelector} from '../../store';

const imgArr = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function SubMenu({isShowSubMenu = false, name, hoverItem}) {
   const [headerHeight] = useGlobalState('headerHeight');
   // get caategory, event in redux
   const {categoryState} = useAppSelector((state) => state.category);
   const {eventState} = useAppSelector((state) => state.event);

   const content = {
      shop: categoryState?.map((item) => item.name) || [],
      event: eventState?.map((item) => item.title) || [],
   };

   const [headerAppHeight, setHeaderAppHeight] = useState(0);
   const [submenuContent, setSubmenuContent] = useState(content[name]);
   const subMenuRef = useRef(null);

   useEffect(() => {
      setSubmenuContent(content[name]);
   }, [name]);

   // useEffect(() => {
   //    const menuHeight = subMenuRef.current.getBoundingClientRect();
   //    setSubMenuHeigth(menuHeight.height);
   // }, [isShowSubMenu, name, submenuContent]);

   // test slider
   const router = useRouter();
   const {isMobile} = useWindowDimensions();

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

   useEffect(() => {
      setHeaderAppHeight(headerHeight);
   }, [headerHeight]);

   const settings = {
      className: 'center',
      dots: true,
      infinite: true,
      slidesToShow: 3,
      swipeToSlide: true,
      autoplay: true,
   };

   return (
      <>
         <div
            className={`fixed left-0 right-0 bg-white rounded-b-lg transition-all z-[19] overflow-hidden`}
            style={{
               height: isShowSubMenu && hoverItem === name ? `350px` : '0px',
               // borderBottom: isShowSubMenu && hoverItem === name ? '1px solid gray' : '',
               top: `${headerAppHeight}px`,
            }}>
            {/* category slider || event slider */}
            <div className='absolute right-0 pr-[44px] w-[500px] top-[15px]'>
               <p className='px-2 mb-3 text-[1.2rem] text-[#891a1c]'>
                  SẢN PHẨM ĐƯỢC YÊU THÍCH NHẤT
               </p>
               <SliderSlick
                  arrows={false}
                  {...settings}
                  beforeChange={handleBeforeChange}
                  afterChange={handleAfterChange}>
                  {imgArr.map((img, index) => (
                     <div key={index} onClickCapture={handleOnItemClick}>
                        <div
                           className='md:px-2 font-thin normal-case text-[0.8rem]'
                           style={{fontFamily: 'Gilroy'}}>
                           <div className='relative cursor-pointer md:rounded-[6px] overflow-hidden'>
                              <Image
                                 src={img}
                                 alt=''
                                 layout='responsive'
                                 objectFit='cover'
                                 onClick={() => router.push('/product/123')}
                              />
                              <p className=''>{uppercaseFirstLetter('Ten san pham')}</p>

                              <p className=''>50.000</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </SliderSlick>
            </div>
         </div>
         <div
            className='absolute left-0 flex flex-col mb-3 overflow-hidden z-[20]'
            style={{
               height: isShowSubMenu && hoverItem === name ? `300px` : '0px',
               top: `${headerAppHeight}px`,
               fontFamily: 'Gilroy',
            }}
            ref={subMenuRef}>
            {submenuContent?.map((item, index) => (
               <div className='relative' key={index}>
                  <BsArrowRightSquare className='absolute top-0 left-[-20px]' />
                  <div
                     key={index}
                     className='whitespace-nowrap font-[200] cursor-pointer hover:font-extrabold hover:underline'>
                     {item}
                  </div>
               </div>
            ))}
            <div className='w-[full] h-[200px]'></div>
         </div>
      </>
   );
}
