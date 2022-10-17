import {useState} from 'react';
import styled from 'styled-components';

export default function HeaderSearch() {
   const [isOnInput, setOnInput] = useState(false);
   const [searchStr, setSearchStr] = useState('');

   return (
      <div className='header__search flex items-end'>
         <DivSC isOnInput={isOnInput} hasSearchStr={searchStr.length > 0}>
            <input
               type='text'
               className=' p-0 outline-none relative'
               onBlur={() => setOnInput(false)}
               onFocus={() => setOnInput(true)}
               onChange={(e) => setSearchStr(e.target.value)}
            />
         </DivSC>
         <span className='pl-2'>Search</span>
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
                  props.isOnInput || props.hasSearchStr ? '-2px' : '6px'
               };
               left: 0;
               width: 100%;
               height: 1px;
               background: ${
                  props.isOnInput || props.hasSearchStr ? '#999' : 'black'
               };
               z-index: 99;
               transition: all ease 0.2s
            }
         `
);
