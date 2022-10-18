import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import styled, {keyframes, css} from 'styled-components';

import img1 from '../../public/images/home/1.jpg';
import img2 from '../../public/images/home/2.jpg';
import img3 from '../../public/images/home/3.jpg';
import img4 from '../../public/images/home/4.jpg';

const ImageArr = [img1, img2, img3, img4];

interface IHomeBackground {
   isHomePage?: boolean;
}

export default function HomeBackground({isHomePage = true}: IHomeBackground) {
   const router = useRouter();
   const [isActiveAnimation, setIsActiveAnimation] = useState(0);

   const changeImageActiveAnimate = () => {
      if (isActiveAnimation < ImageArr.length - 1) {
         setIsActiveAnimation((pre) => pre + 1);
      } else {
         setIsActiveAnimation(0);
      }
   };

   const handleClickImage = () => {
      if (isHomePage) {
         router.push('/product/124');
      } else {
         return;
      }
   };
   useEffect(() => {
      const intervalId = setInterval(changeImageActiveAnimate, 4000);
      return () => clearInterval(intervalId);
   }, [isActiveAnimation]);

   return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-0'>
         {ImageArr.map((imageSrc, index) => (
            <a onClick={() => handleClickImage()}>
               <ImageSC
                  src={imageSrc}
                  active={isActiveAnimation === index ? '1' : ''}
                  isHomePage={isHomePage}
                  key={index}
                  layout='responsive'
                  objectFit='cover'
               ></ImageSC>
            </a>
         ))}
      </div>
   );
}

const lighting = keyframes`
   0% {
      filter: brightness(1)
   }
   50% {
      filter: brightness(1.2)
   }
   100% {
      filter: brightness(1)
   }
`;

const ImageSC = styled(Image)<any>(
   (props) => css`
      animation: ${props.active &&
      props.isHomePage &&
      css`1s linear ${lighting}`};

      animation-timing-function: linear;
      transition: all 0.3s linear;
      transform: 'scale(1.01)';

      &:hover {
         transform: ${props.isHomepage && 'scale(1.1)'};
         z-index: 9;
         border: 10px solid red;
         box-sizing: content-box;
      }
   `
);
