export default function BagItemHover() {
   return (
      <div className='flex justify-between'>
         <div className='flex gap-1'>
            <img
               src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQLG2aQbb_A6E3JwO29d76XyJRbxWIo6nUqhe-93DDIr7g4u96ZMVBLybnsxzOd3pJCQ0&usqp=CAU'
               alt=''
               className='w-[70px] md:w-[90px] object-cover rounded-md'
            />
            <div className='capitalize text-[0.85rem] font-thin'>
               <p>Tên sản phẩm Tên sản phẩmTên sản phẩmTên sản phẩm</p>
               <p className='lowercase'>x 2</p>
            </div>
         </div>
         <div className='mr-2'>
            <span className='font-semibold'>
               {(5000000).toLocaleString('en-US')}
            </span>
         </div>
      </div>
   );
}
