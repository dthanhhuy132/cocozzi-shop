import {useState, useRef, useEffect} from 'react';
import Cookies from 'js-cookie';

import {GetServerSideProps} from 'next';
import homeApi from '../../service/panelApi';

import {AdminLayout} from '../../components/Admin';
import {AdminButton} from '../../components/Admin/common';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import panelApi from '../../service/panelApi';
import {PANEL_FOR_BANNER, PANEL_FOR_HOME} from '../../store/panel/panelSlice';
import sortDataByUpdatedTime from '../../components/Admin/common/sortDataByUpdatedTime';
import {useAppDispatch, useAppSelector} from '../../store';
import {createPanelAsyns, getAllPanelAsync} from '../../store/panel/panelAsyncAction';
import {create} from 'yup/lib/array';
import LoadingActionPage from '../../components/common/LoadingPage';
import {toast} from 'react-toastify';

const accessToken = Cookies.get('accessToken');
export default function AdminHomePage({homePanelList}) {
   const dispatch = useAppDispatch();
   const [isShowLoading, setIsShowLoading] = useState(false);

   const [imageFiles, setImageFiles] = useState<any>([]);
   const [imgesURL, setImagesURL] = useState([]);
   const [renderHomePanelList, setRenderHomePanelList] = useState(
      homePanelList?.filter((item) => item?.description?.indexOf(PANEL_FOR_HOME) >= 0)
   );

   // get data from redux
   const {panelForHomeState} = useAppSelector((state) => state.panel);

   const inputFilesRef = useRef(null);

   // function click upload file
   function handleClickUploadImage(e) {
      e.preventDefault();
      inputFilesRef.current.click();
   }

   // function add new panel
   function handleCreateNewPanel(e) {
      setIsShowLoading(true);
      e.preventDefault();

      const formData = new FormData();
      formData.append('description', PANEL_FOR_HOME);

      imageFiles.forEach((imageFile) => {
         formData.append('pictures', imageFile);
      });

      dispatch(createPanelAsyns({accessToken, formData})).then((res) => {
         setIsShowLoading(false);

         if (res.payload.ok) {
            dispatch(getAllPanelAsync());
            // reset img
            setImageFiles([]);
            setImagesURL([]);
         } else {
            toast.error(res.payload.message);
         }
         setIsShowLoading(false);
      });
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

   useEffect(() => {
      if (panelForHomeState || panelForHomeState?.length > 0) {
         const sortHomePanelState = sortDataByUpdatedTime(panelForHomeState);
         setRenderHomePanelList(sortHomePanelState);
      }
   }, [panelForHomeState]);

   return (
      <AdminLayout>
         <div>
            <form>
               <div className='mb-2'>Upload images for home page</div>
               <span className='mb-2 italic'>
                  Hình nằm ngang, kích kích các hình nên giống nhau, dung lượng &lt; 300kb, &#40;Bộ
                  hình ảnh đầu tiên được sử dụng để hiện thị trên trang home&#41;
               </span>

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
            {imgesURL.length > 0 && (
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

            {renderHomePanelList.map((item, index) => (
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
         {isShowLoading && <LoadingActionPage />}
      </AdminLayout>
   );
}

export const getServerSideProps: GetServerSideProps<any> = async () => {
   let homeImageList;

   try {
      const response = await panelApi.getAllPanel();
      const homePanelRes = response?.data?.data;
      homeImageList = homePanelRes.filter(
         (item) => item?.status !== 'cancel' && item?.pictures?.length > 0
      );
   } catch (error) {}

   console.log('homeImageList', homeImageList);
   return {
      props: {
         homePanelList: homeImageList || [],
      },
   };
};
