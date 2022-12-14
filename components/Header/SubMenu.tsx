import {useEffect, useRef, useState, useCallback} from 'react';
import useGlobalState from '../../state';

import {BsArrowRightSquare} from 'react-icons/bs';

// test slider
import SliderSlick from 'react-slick';

import useWindowDimensions from '../../hooks/UseWindowDimensions';

import Image from 'next/image';
import {useRouter} from 'next/router';
import uppercaseFirstLetter from '../../helper/uppercaseFirstLetter';
import {useAppSelector} from '../../store';
import {ProductItem} from '../ProductItem';
import randomProductIndexForHeader from '../../helper/randomProductIndexForHeader';
import stringToSlug from '../../helper/stringToSlug';

export default function SubMenu({isShowSubMenu = false, name, hoverItem, productGroupByNameList}) {
   const [headerHeight] = useGlobalState('headerHeight');
   // get caategory, event in redux
   const {categoryProductState} = useAppSelector((state) => state.category);
   const {eventState} = useAppSelector((state) => state.event);

   // random product for header
   const [renderListProductForSubMenu, setRenderListProductForSubMenu] = useState([]);

   // sub menu content (category and event)
   const content = {
      shop: categoryProductState?.map((item) => item.name) || [],
      event: eventState?.map((item) => item.title) || [],
   };

   const [headerAppHeight, setHeaderAppHeight] = useState(0);
   const [submenuContent, setSubmenuContent] = useState(content[name]);
   const subMenuRef = useRef(null);

   useEffect(() => {
      setSubmenuContent(content[name]);
   }, [name]);

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

   function handleClickOnSubMenuItem(item, name) {
      const slugLink = stringToSlug(item);
      if (name === 'shop') {
         router.push(`/category/${slugLink}`);
      } else {
         router.push(`/event/${slugLink}`);
      }
   }

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

   // useEffect random product
   useEffect(() => {
      const randomIndexArr = randomProductIndexForHeader(productGroupByNameList.length);
      const randomProductForHeader = randomIndexArr.map(
         (randomIndex) => productGroupByNameList.filter((item, index) => index === randomIndex)[0]
      );

      setRenderListProductForSubMenu(randomProductForHeader);
   }, [productGroupByNameList]);

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
               <p className='px-2 mb-3 text-[#891a1c]'>S???N PH???M N???I B???T</p>
               <SliderSlick
                  arrows={false}
                  {...settings}
                  beforeChange={handleBeforeChange}
                  afterChange={handleAfterChange}>
                  {renderListProductForSubMenu.length > 0 &&
                     renderListProductForSubMenu.map((product, index) => (
                        <div key={index} onClickCapture={handleOnItemClick}>
                           <div
                              className='md:px-2 font-thin normal-case text-[0.8rem]'
                              style={{fontFamily: 'Gilroy'}}>
                              <ProductItem
                                 product={product}
                                 key={index}
                                 showPrice={false}
                                 smallName={true}></ProductItem>
                           </div>
                        </div>
                     ))}
               </SliderSlick>
            </div>
         </div>

         {/* --------------------------------------------> click on submenu link */}
         <div
            className='absolute left-0 flex flex-col mb-3 overflow-hidden z-[20]'
            style={{
               height: isShowSubMenu && hoverItem === name ? `300px` : '0px',
               top: `${headerAppHeight}px`,
               fontFamily: 'Gilroy',
            }}
            ref={subMenuRef}>
            {/* submenu content */}
            {submenuContent?.map((item, index) => (
               <div className='relative' key={index}>
                  <BsArrowRightSquare className='absolute top-0 left-[-20px]' />
                  <div
                     key={index}
                     className='whitespace-nowrap font-[200] cursor-pointer hover:font-extrabold hover:underline'
                     onClick={() => {
                        handleClickOnSubMenuItem(item, name);
                     }}>
                     {item}
                  </div>
               </div>
            ))}
            <div className='w-[full] h-[200px]'></div>
         </div>
      </>
   );
}
