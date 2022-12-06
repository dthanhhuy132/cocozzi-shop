import img from '../../public/images/shop/1.webp';
export default function BagItemHover() {
   return (
      <div className='flex justify-between'>
         <div className='flex gap-1'>
            <img
               src='/images/shop/1.webp'
               alt='hinh anh'
               className='w-[50px] md:w-[70px] object-contain rounded-md'
            />
            <div className='capitalize text-[0.85rem]'>
               <p>Tên sản phẩm Tên sản phẩmTên sản phẩmTên sản phẩm</p>
               <p className='lowercase'>x 2</p>
            </div>
         </div>
         <div className='mr-2'>
            <span className='font-semibold'>{(5000000).toLocaleString('en-US')}</span>
         </div>
      </div>
   );
}
