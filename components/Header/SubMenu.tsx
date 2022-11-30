import {useEffect, useRef, useState} from 'react';
import {ShopSliderProductStory} from '../Shop';

export default function SubMenu({isShowSubMenu = false, name}) {
   const content = {
      shop: ['category 1', 'category 2', 'category 3'],
      event: ['event 1', 'event 2'],
   };

   const [subMenuHeigth, setSubMenuHeigth] = useState(0);
   const [submenuContent, setSubmenuContent] = useState(content[name]);
   const subMenuRef = useRef(null);

   useEffect(() => {
      setSubmenuContent(content[name]);
   }, [name]);

   useEffect(() => {
      const menuHeight = subMenuRef.current.getBoundingClientRect();
      setSubMenuHeigth(menuHeight.height);
   }, [isShowSubMenu, name, submenuContent]);

   return (
      <div
         className={`absolute h-[0] left-[50%] translate-x-[-50%] top-[40px] w-full bg-white rounded-b-lg drop-shadow-lg transition-all z-[19] overflow-hidden `}
         style={{height: isShowSubMenu ? `${subMenuHeigth}px` : '0px'}}
         // ${isShowSubMenu && `h-[${subMenuHeigth}px]`}
      >
         <div className='p-3 mb-3 flex flex-col' ref={subMenuRef}>
            <div>
               {submenuContent?.map((item, index) => (
                  <div key={index} className='whitespace-nowrap'>
                     {item}
                  </div>
               ))}
            </div>
            <div className='w-[full]'>
               <ShopSliderProductStory />
            </div>
         </div>
      </div>
   );
}
