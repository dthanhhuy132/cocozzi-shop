import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

interface IHeaderSearch {
   whiteLine?: Boolean;
}

export default function HeaderSearch({whiteLine = false}: IHeaderSearch) {
   const [isOnInput, setOnInput] = useState(false);
   const [searchStr, setSearchStr] = useState('');

   const inputRef = useRef(null);

   return (
      <div className='header__search flex items-end'>
         <DivSC
            isOnInput={isOnInput}
            hasSearchStr={searchStr.length > 0}
            whiteLine={whiteLine}>
            <input
               type='text'
               className='lg:block p-0 outline-none relative bg-transparent '
               onBlur={() => setOnInput(false)}
               onFocus={() => setOnInput(true)}
               onChange={(e) => setSearchStr(e.target.value)}
               ref={inputRef}
            />
         </DivSC>
         <span className='pl-2'>
            <i
               className='fa-solid fa-magnifying-glass -scale-x-100 cursor-pointer text-[1.2rem]'
               onClick={() => inputRef.current && inputRef.current.focus()}></i>
         </span>
      </div>
   );
}

const DivSC = styled('div')<any>(
   (props) => `
         position: relative;

            &:before {
               content: '';
               position: absolute;
               bottom: ${
                  props.isOnInput || props.hasSearchStr ? '-2px' : '5px'
               };
               left: 0;
               width: 100%;
               height: 1px;
               background: ${
                  props.isOnInput || props.hasSearchStr
                     ? '#999'
                     : props.whiteLine
                     ? '#999'
                     : 'black'
               };
               z-index: 99;
               transition: all ease 0.2s
            }
         `
);
