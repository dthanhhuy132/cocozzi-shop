interface IAdminModal {
   children?: any;
   ok: () => void;
   cancel: () => void;
   title?: string;
   className?: string;
}

export default function AdminModal({
   children,
   ok = () => {},
   cancel = () => {},
   title = '',
   className = '',
}: IAdminModal) {
   return (
      <>
         <div className='fixed inset-0 bg-black opacity-80'></div>
         <div
            className={`fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-100 min-w-[600px] min-h-[100px] bg-white rounded-lg px-2 ${className}`}>
            {/* hedaer */}
            <p className='border-b-2 mb-2 py-2 font-bold'>{title}</p>
            {/* content */}
            {children}

            {/* footer */}
            <div className='flex gap-2 justify-center my-2 border-t-2 pt-2'>
               <button
                  className='bg-black hover:bg-[green] min-w-[100px] py-2 rounded-lg text-white'
                  onClick={ok}>
                  ok
               </button>
               <button
                  className='hover:bg-[#891a1c] bg-black min-w-[100px] py-2 rounded-lg text-white'
                  onClick={cancel}>
                  cancel
               </button>
            </div>
         </div>
      </>
   );
}
