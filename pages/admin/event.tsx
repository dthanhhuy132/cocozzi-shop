import {useState, useEffect} from 'react';

import {AdminLayout, AdminModal} from '../../components/Admin';
import {CategoryTableHeader} from '../../components/Admin/Category';
import {EventTableHeader} from '../../components/Admin/Event';
import eventApi from '../../service/eventApi';
import {useAppSelector} from '../../store';

import {AiOutlinePlusCircle} from 'react-icons/ai';
import {AdminButton} from '../../components/Admin/common';

export default function AdminEventPage({eventList: eventListProps}) {
   const {eventState} = useAppSelector((state) => state.event);

   const [isShowActive, setIsShowactive] = useState(false);
   const [eventObj, seetEventObj] = useState(null);
   const [isShowModal, setIsShowModal] = useState(false);

   const [eventList, setEventList] = useState(eventState || eventListProps);


   useEffect(() => {
      if (isShowActive) {
         const showOnlyActiveEventList = eventList.filer((item) => item.status !== false);
         setEventList(showOnlyActiveEventList);
      }
   }, [isShowActive]);

   function handleClickEdit(eventItem) {}

   return (
      <AdminLayout>
         <div className='container w-full px-8'>
            <div className='flex gap-10 items-center'>
               <h2 className='text-2xl font-semibold'>Event list</h2>
               <AdminButton click={() => {}}>
                  <AiOutlinePlusCircle /> Create new Event
               </AdminButton>
            </div>
            <div className='-mx-4 sm:-mx-8 px-4 py-4 overflow-x-auto'>
               <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
                  <table className='min-w-full leading-normal'>
                     <EventTableHeader />
                     <tbody>
                        {eventList.map((eventItem) => (
                           <tr key={eventItem._id}>
                              {/* name */}
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                 <span>{eventItem.title}</span>
                              </td>
                              {/* image */}
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                 <div>
                                    {eventItem.images.map((img) => (
                                       <img src={img}></img>
                                    ))}
                                 </div>
                              </td>

                              {/* status */}
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                 <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                                    <span
                                       aria-hidden
                                       className='absolute inset-0 bg-green-400 opacity-50 rounded-full'
                                    />
                                    <span className='px-2'>
                                       {eventItem.status ? 'active' : 'disabled'}
                                    </span>
                                 </span>
                              </td>
                              {/* edit */}
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-right'>
                                 <button
                                    data-tooltip-target='tooltip-light'
                                    data-tooltip-style='light'
                                    type='button'
                                    onClick={() => handleClickEdit(eventItem)}
                                    className='text-white bg-black hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                                    Edit
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         {isShowModal && (
            <AdminModal ok={() => {}} cancel={() => setIsShowModal(false)}></AdminModal>
         )}
      </AdminLayout>
   );
}

export const getServerSideProps = async () => {
   const eventRes = await eventApi.getAllEvent();

   const eventList = eventRes?.data?.data;

   return {
      props: {
         eventList: eventList || [],
      },
   };
};
