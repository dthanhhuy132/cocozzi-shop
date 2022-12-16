import {useState, useEffect, useRef} from 'react';

import {WarningText} from '../common';

import {useFormik} from 'formik';
import * as Yup from 'yup';

export const EventSchema = {
   title: Yup.string().required('Vui lòng nhập title!'),
   startDate: Yup.date().required('Vui lòng nhập start time'),
   endDate: Yup.date()
      .required('Vui lòng nhập end time')
      .when('startDate', (startDate, schema) => startDate && schema.min(startDate)),
   percent: Yup.number().required('vui lòng nhập phần trăm giảm giá cho Event'),
   description: Yup.string().required('Vui lòng nhập description cho Event!'),
   images: Yup.mixed().required('Images is required'),
};

export default function ModalCreateEvent({
   ok = () => {},
   cancel = () => {},
   handleCreateEvent,
}: any) {
   //create image
   const [imageFiles, setImageFiles] = useState<any>([]);
   const [imgesURL, setImagesURL] = useState([]);

   const inputFilesRef = useRef(null);

   const createEventForPromoInitValue = {
      title: '',
      startDate: '',
      endDate: '',
      percent: 10,
      status: true,
      description: '',
      images: '',
   };

   const formik = useFormik({
      initialValues: createEventForPromoInitValue,
      validationSchema: Yup.object(EventSchema),
      onSubmit: (values) => {
         const newEvent = {
            title: values.title,
            description: values.description,
            startDate: values.startDate,
            endDate: values.endDate,
            status: true,
            percent: 10,
            typeEvent: 'event-for-event',
            images: imageFiles,
         };

         handleCreateEvent(newEvent);
      },
   });

   // function click upload file

   function handleResetImg() {
      setImageFiles([]);
      setImagesURL([]);
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
      <div>
         <form autoComplete='off' onSubmit={formik.handleSubmit}>
            <div className='flex gap-3'>
               <div className='w-1/3 border-[1px] rounded-md relative'>
                  {formik.errors.images && formik.touched.images && (
                     <WarningText warningText={formik.errors.images} />
                  )}
                  <>
                     {imgesURL.length > 0 ? (
                        imgesURL.map((imgURL, index) => (
                           <img src={imgURL} alt='image' key={index} />
                        ))
                     ) : (
                        <button
                           className='absolute p-5 text-[4rem] hover:text-[5rem] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transition-all'
                           onClick={() => inputFilesRef.current.click()}>
                           +
                        </button>
                     )}
                  </>

                  {imgesURL.length > 0 && (
                     <button
                        className='absolute text-gray-300 hover:text-gray-900 text-[2rem] top-[-10px] right-[10px] transition-all'
                        onClick={() => {
                           handleResetImg();
                           formik.values.images = '';
                        }}>
                        x
                     </button>
                  )}

                  <div>
                     <input
                        name='images'
                        type='file'
                        accept='image/*'
                        multiple
                        hidden
                        onChange={(e) => {
                           formik.handleChange(e);
                           handleUploadImages(e);
                        }}
                        ref={inputFilesRef}
                     />
                  </div>
               </div>

               <div className='w-2/3 flex flex-col gap-3'>
                  {/* title */}
                  <div>
                     <label htmlFor=''>Title</label>
                     <input
                        name='title'
                        className='w-full border-2 px-2 py-1 rounded-md'
                        value={formik.values.title}
                        onChange={formik.handleChange}
                     />
                     {formik.errors.title && formik.touched.title && (
                        <WarningText warningText={formik.errors.title} />
                     )}
                  </div>

                  {/* description */}
                  <div>
                     <label htmlFor=''>Description</label>
                     <textarea
                        name='description'
                        className='w-full border-2 px-2 py-1 rounded-md'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                     />
                     {formik.errors.description && formik.touched.description && (
                        <WarningText warningText={formik.errors.description} />
                     )}
                  </div>
                  <div>
                     <label htmlFor=''>Start date</label>
                     <input
                        name='startDate'
                        className='w-full border-2 px-2 py-1 rounded-md'
                        type='date'
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                     />

                     {formik.errors.startDate && formik.touched.startDate && (
                        <WarningText warningText={formik.errors.startDate} />
                     )}
                  </div>
                  <div>
                     <label htmlFor=''>End date</label>

                     <input
                        name='endDate'
                        className='w-full border-2 px-2 py-1 rounded-md'
                        type='date'
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                     />
                     {formik.errors.endDate && formik.touched.endDate && (
                        <WarningText warningText={formik.errors.endDate} />
                     )}
                  </div>
                  <div>
                     <label htmlFor=''>Percent (%)</label>
                     <input
                        type='number'
                        name='percent'
                        className='w-full border-2 px-2 py-1 rounded-md'
                        value={formik.values.percent}
                        onChange={formik.handleChange}
                     />
                     {formik.errors.percent && formik.touched.percent && (
                        <WarningText warningText={formik.errors.percent} />
                     )}
                  </div>
               </div>
            </div>

            <div className='flex gap-2 justify-center my-2 border-t-2 pt-2'>
               <button
                  type='submit'
                  className='bg-black hover:bg-[green] min-w-[100px] py-2 rounded-lg text-white'>
                  ok
               </button>
               <button
                  className='hover:bg-[#891a1c] bg-black min-w-[100px] py-2 rounded-lg text-white'
                  onClick={cancel}>
                  cancel
               </button>
            </div>
         </form>
      </div>
   );
}
