import {useState} from 'react';

import {AiOutlinePlusCircle} from 'react-icons/ai';
import {AdminLayout, AdminModal} from '../../components/Admin';
import {AdminButton, WarningText} from '../../components/Admin/common';
import categoryApi from '../../service/categoryApi';
import PromoInstruction from '../../components/Admin/Promo/PromoInstruction';
import ModalCreateEventForPromo from '../../components/Admin/Promo/ModalCreateEventForPromo';
import ModalCreatePromo from '../../components/Admin/Promo/ModalCreatePromo';
import eventApi from '../../service/eventApi';

export default function PromoPage({promoList, eventList}) {
   // console.log('promo list la gi', promoList);
   const [isShowModalForEventPromo, setIsShowModalForEventPromo] = useState(false);
   const [isShowModalForPromo, setIsShowModalForPromo] = useState(false);

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
               showFooter={false}
               className='w-[800px] pb-2'
               title='Create new Event for Promo'>
               <ModalCreateEventForPromo cancel={() => setIsShowModalForEventPromo(false)} />
            </AdminModal>
         )}

         {isShowModalForPromo && (
            <AdminModal showFooter={false} className='w-[800px] pb-2' title='Create new Promo'>
               <ModalCreatePromo
                  eventList={eventList}
                  cancel={() => setIsShowModalForPromo(false)}
               />
            </AdminModal>
         )}
      </AdminLayout>
   );
}

export const getServerSideProps = async () => {
   const categoryRes = await categoryApi.getAllCategory();
   const eventRes = await eventApi.getAllEvent();

   const categoryList = categoryRes.data.data || [];
   const eventList = eventRes?.data?.data || [];
   const promoList = categoryList.filter((item) => item);
   // const promoList = categoryList.filter((item) => item.name.indexOf('for-promo') >= 0);

   return {
      props: {
         promoList: promoList || [],
         eventList: eventList,
      },
   };
};
