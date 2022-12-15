import {useState} from 'react';

import {useFormik} from 'formik';
import * as Yup from 'yup';

import {AiOutlinePlusCircle} from 'react-icons/ai';
import {AdminLayout, AdminModal} from '../../components/Admin';
import {AdminButton, WarningText} from '../../components/Admin/common';
import InputCustom from '../../components/Admin/common/InputCustom';
import validateEventForPromoSchema from '../../components/Admin/Promo/PromoSchema';
import categoryApi from '../../service/categoryApi';
import PromoInstruction from '../../components/Admin/Promo/PromoInstruction';

export default function PromoPage({promoList}) {
   console.log('promo list la gi', promoList);
   const [isShowModalForEventPromo, setIsShowModalForEventPromo] = useState(false);
   const [isShowModalForPromo, setIsShowModalForPromo] = useState(false);

   const createEventForPromoInitValue = {
      title: '',
      startDate: Date.now(),
      endDate: Date.now(),
      percent: 0.1,
      status: true,
      images: '',
      description: 'event-for-promo',
   };

   const formik = useFormik({
      initialValues: createEventForPromoInitValue,
      validationSchema: Yup.object().shape(validateEventForPromoSchema),
      onSubmit: (values) => {
         console.log('values cho nay la gi', values);
      },
   });

   function createNewEventForPromo() {}

   function createNewPromo() {}

   return (
      <AdminLayout>
         <div className='border-b-2 pb-2'>
            <PromoInstruction></PromoInstruction>

            {/* Tạo event */}
            <div className=''>
               <AdminButton
                  className='min-w-[250px]'
                  click={() => setIsShowModalForEventPromo(true)}>
                  <AiOutlinePlusCircle /> Create new Event for Promo
               </AdminButton>

               <AdminButton
                  className='mt-2 min-w-[250px]'
                  click={() => setIsShowModalForPromo(true)}>
                  <AiOutlinePlusCircle /> Create new Promo
               </AdminButton>
            </div>
         </div>

         {/* Promo list */}
         <div>
            <h2 className='mt-4 font-extrabold text-[1.3rem]'>Promo list</h2>
            <div className='grid grid-cols-3 gap-5 gap-y-10 mt-5'>
               {promoList.map((promo) => (
                  <div>
                     <img
                        src={
                           promo.categoryImage[0] ||
                           'https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg'
                        }
                        className='h-[300px] object-cover'
                        alt='Promo img'
                     />
                     <p className='font-bold'>Name: {promo.name}</p>
                     <p className='italic'>Description: {promo?.description}</p>
                  </div>
               ))}
            </div>
         </div>

         {isShowModalForEventPromo && (
            <AdminModal
               className='w-[800px]'
               ok={createNewEventForPromo}
               cancel={() => setIsShowModalForEventPromo(false)}
               title='Create new Event for Promo'>
               <div className='flex gap-3'>
                  <div className='w-1/3 border-[1px] rounded-md'>
                     <div className=''></div>
                     <img src='' alt='' />
                  </div>
                  <form
                     className='w-2/3 flex flex-col gap-3'
                     autoComplete='off'
                     onSubmit={formik.handleSubmit}>
                     <div>
                        <InputCustom label='Title' value={formik.values.title} />
                        {formik.errors.title && formik.touched.title && (
                           <WarningText warningText={formik.errors.title} />
                        )}
                     </div>
                     <div>
                        <InputCustom
                           type='date'
                           label='Start Date'
                           value={formik.values.startDate}
                        />

                        {formik.errors.startDate && formik.touched.startDate && (
                           <WarningText warningText={formik.errors.startDate} />
                        )}
                     </div>
                     <div>
                        <InputCustom type='date' label='End Date' value={formik.values.endDate} />
                        {formik.errors.endDate && formik.touched.endDate && (
                           <WarningText warningText={formik.errors.endDate} />
                        )}
                     </div>
                     <div>
                        <InputCustom label='% Discount for event' value={formik.values.percent} />
                        {formik.errors.percent && formik.touched.percent && (
                           <WarningText warningText={formik.errors.percent} />
                        )}
                     </div>
                     <div>
                        <InputCustom label='Event Status' value={formik.values.images} />
                        {formik.errors.images && formik.touched.images && (
                           <WarningText warningText={formik.errors.images} />
                        )}
                     </div>
                  </form>
               </div>
            </AdminModal>
         )}
      </AdminLayout>
   );
}

export const getServerSideProps = async () => {
   const categoryRes = await categoryApi.getAllCategory();

   const categoryList = categoryRes.data.data || [];

   const promoList = categoryList.filter((item) => item);
   // const promoList = categoryList.filter((item) => item.name.indexOf('for-promo') >= 0);

   return {
      props: {
         promoList: promoList || [],
      },
   };
};
