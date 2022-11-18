import img1 from '../../public/images/shop/1.webp';
import img2 from '../../public/images/shop/2.webp';
import img3 from '../../public/images/shop/3.webp';
import img4 from '../../public/images/shop/4.webp';
import img5 from '../../public/images/shop/5.webp';
import img6 from '../../public/images/shop/6.webp';
import img7 from '../../public/images/shop/7.webp';
import img8 from '../../public/images/shop/8.webp';
import {ProductItem} from '../ProductItem';
const imgArr = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function ShopProduct() {
   return (
      <div className='grid grid-cols-1 md:grid-cols-4 gap-7 md:gap-0'>
         {imgArr.map((img, index) => (
            <ProductItem
               key={index}
               img={img}
               displayPrice={true}></ProductItem>
         ))}
      </div>
   );
}
