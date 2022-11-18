import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {BsSearch} from 'react-icons/bs';
import {useRouter} from 'next/router';
interface IHeaderSearch {
   whiteLine?: Boolean;
}

export default function HeaderSearch({whiteLine = false}: IHeaderSearch) {
   const [isOnInput, setOnInput] = useState(false);
   const [searchStr, setSearchStr] = useState('');

   const router = useRouter();

   const inputRef = useRef(null);

   useEffect(() => {
      if (searchStr.trim()) {
         router.push(`/search?q=${searchStr}`);
      } else if (!searchStr.trim() && router.pathname.indexOf('/search') >= 0) {
         router.push('/');
      }
   }, [searchStr]);

   return (
      <div className='flex items-end'>
         <DivSC
            isOnInput={isOnInput}
            hasSearchStr={searchStr.length > 0}
            whiteLine={whiteLine}>
            <input
               type='text'
               className='lg:block p-0 outline-none relative bg-transparent w-full'
               onBlur={() => setOnInput(false)}
               onFocus={() => setOnInput(true)}
               onChange={(e) => setSearchStr(e.target.value)}
               value={searchStr}
               ref={inputRef}
            />
         </DivSC>
         <span className='pl-2 mb-[1px]'>
            <BsSearch
               className=' -scale-x-100 cursor-pointer text-[1.4rem]'
               onClick={() => inputRef.current && inputRef.current.focus()}
            />
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
               right: 0;
               bottom: ${
                  props.isOnInput || props.hasSearchStr ? '-2px' : '1px'
               };
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
