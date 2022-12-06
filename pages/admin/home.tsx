import {useState, useRef} from 'react';
import Cookies from 'js-cookie';

import {GetServerSideProps} from 'next';
import homeApi from '../../service/homeApi';
import imageError from '../../public/images/imageError.png';
import {useSelector} from 'react-redux';
import {useAdminAuthen} from '../../helper/useAuthen';
export default function AdminHomePage({homeImages}) {
   useAdminAuthen();
   const [imageFiles, setImageFiles] = useState<any>([]);
   const [imgesURL, setImagesURL] = useState([]);

   const accessToken = Cookies.get('accessToken');

   const inputFilesRef = useRef(null);

   function handleCreateNewPanel() {
      const formData = new FormData();
      formData.append('description', 'panel');
      formData.append('pictures', imageFiles);

      homeApi.createHomeImage(accessToken, formData);
   }

   function handleUploadImages(e: any) {
      const tempImgFiles = [];
      const tempImgURL = [];

      [...e.target.files].forEach((file) => {
         tempImgFiles.push(file);
         tempImgURL.push(URL.createObjectURL(file));
      });

      setImageFiles(tempImgFiles);
      setImagesURL(tempImgURL);
   }

   return (
      <div className='ml-64 p-5'>
         <div>
            <form>
               <div className='mb-2'>Upload images for home page</div>
               <input
                  type='file'
                  accept='image/*'
                  multiple
                  hidden
                  onChange={handleUploadImages}
                  ref={inputFilesRef}
               />
               <div className='flex justify-between'>
                  <button
                     type='button'
                     className='bg-[#333333] text-white p-2 rounded-lg'
                     onClick={() => inputFilesRef.current.click()}>
                     Choose images
                  </button>
                  {imageFiles.length > 0 && (
                     <button
                        type='button'
                        className='bg-[green] text-white p-2 rounded-lg'
                        onClick={handleCreateNewPanel}>
                        Upload images
                     </button>
                  )}
               </div>
            </form>

            {/* preview upload file */}
            {imageFiles.length > 0 && (
               <div className='mt-2 p-2 border-2'>
                  <p className='mb-2 font-bold'>Preview images upload:</p>
                  <div className='grid grid-cols-3 gap-2'>
                     {imgesURL.map((imgURL, index) => (
                        <img src={imgURL} alt='image' key={index} />
                     ))}
                  </div>
               </div>
            )}
         </div>

         {homeImages.map((item) => {
            return (
               <>
                  <div key={item._id}>
                     <img src={item.pictures[0]} alt='' />
                     <p>hinfh cho nay: {item.pictures[0]}</p>
                  </div>
                  {/* create panel */}
               </>
            );
         })}
      </div>
   );
}

export const getServerSideProps: GetServerSideProps<any> = async () => {
   const response = await homeApi.getAllHomeImage();
   const homeImages = response.data.data.filter((item) => item.status !== 'cancel');

   return {
      props: {
         homeImages: homeImages || [],
      },
   };
};
