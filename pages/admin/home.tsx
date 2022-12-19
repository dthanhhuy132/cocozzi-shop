import {useState, useRef} from 'react';
import Cookies from 'js-cookie';

import {GetServerSideProps} from 'next';
import homeApi from '../../service/panelApi';

import {AdminLayout} from '../../components/Admin';
import {AdminButton} from '../../components/Admin/common';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import panelApi from '../../service/panelApi';

export default function AdminHomePage({homeImages}) {
   const [imageFiles, setImageFiles] = useState<any>([]);
   const [imgesURL, setImagesURL] = useState([]);

   const accessToken = Cookies.get('accessToken');

   const inputFilesRef = useRef(null);

   // function click upload file
   function handleClickUploadImage(e) {
      e.preventDefault();
      inputFilesRef.current.click();
   }

   // function add new panel
   function handleCreateNewPanel(e) {
      e.preventDefault();

      const formData = new FormData();
      formData.append('description', 'panel-test');

      imageFiles.forEach((imageFile) => {
         formData.append('pictures', imageFile);
      });

      // homeApi.createHomeImage(accessToken, formData);
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
      <AdminLayout>
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
                  <div>
                     <AdminButton click={(e) => handleClickUploadImage(e)}>
                        <AiOutlinePlusCircle /> Upload image to create panel
                     </AdminButton>
                     <span className='text-[0.9rem] italic'>(Tỉ lệ hình ảnh 16:9)</span>
                  </div>
                  {imageFiles.length > 0 && (
                     <AdminButton className='bg-green-700' click={(e) => handleCreateNewPanel(e)}>
                        <AiOutlinePlusCircle /> Create new Panel
                     </AdminButton>
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

         {/* pannel list */}
         <div className='grid grid-cols-1 gap-5 mt-5'>
            <p className='font-bold border-b-2'>Pannel list</p>

            {homeImages.map((item, index) => (
               // list image of each pannel
               <div className='' key={index}>
                  <p className='mb-1'>
                     {index + 1}. {item.description}
                  </p>
                  <div key={item._id} className='grid grid-cols-3 gap-y-2'>
                     {item?.pictures?.length > 0 &&
                        item.pictures.map((pic) => (
                           <img src={pic} alt='Hình ảnh panel' key={pic}></img>
                        ))}
                  </div>
               </div>
            ))}
         </div>
      </AdminLayout>
   );
}

export const getServerSideProps: GetServerSideProps<any> = async () => {
   let homeImageList;

   try {
      const response = await panelApi.getAllPanel();
      homeImageList = response.data.data.filter((item) => item.status !== 'cancel');
   } catch (error) {}
   return {
      props: {
         homeImages: homeImageList || [],
      },
   };
};
