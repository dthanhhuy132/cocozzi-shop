import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

import {AdminLayout, AdminModal} from '../../components/Admin';
import {CategoryTableHeader} from '../../components/Admin/Category';
import {EventTableHeader} from '../../components/Admin/Event';
import eventApi from '../../service/eventApi';
import {useAppSelector} from '../../store';

import {AiOutlinePlusCircle} from 'react-icons/ai';
import {AdminButton} from '../../components/Admin/common';
import ModalCreateEvent from '../../components/Admin/Event/ModalCreateEvent';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {createEventAsyns} from '../../store/event/eventAsynAction';
import LoadingActionPage from '../../components/common/LoadingPage';

export default function AdminEventPage({eventList: eventListProps}) {
   const dispatch = useDispatch();
   const {eventState} = useAppSelector((state) => state.event);

   const [isLoading, setIsLoading] = useState(false);

   const [isShowActive, setIsShowactive] = useState(false);
   const [isShowModal, setIsShowModal] = useState(false);

   const [eventList, setEventList] = useState(eventState || eventListProps);

   const accessToken = Cookies.get('accessToken');

   useEffect(() => {
      if (isShowActive) {
         const showOnlyActiveEventList = eventList.filer((item) => item.status !== false);
         setEventList(showOnlyActiveEventList);
      }
   }, [isShowActive]);

   function handleClickEditEvent(editEvent) {}

   // handle create new event
   function handleCreateEvent(newEvent) {
      setIsLoading(true);
      const {title, description, startDate, endDate, status, percent, typeEvent, images} = newEvent;

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('percent', percent);

      // event type chưa sửa
      // formData.append('typeEvent', typeEvent);

      images.forEach((imageFile) => {
         formData.append('images', imageFile);
      });

      dispatch(createEventAsyns({accessToken, formData}));
   }

   // function handle edit event
   function handleEditEvent(editEvent) {}

   return (
      <AdminLayout>
         <div className='container w-full px-8'>
            <div className='flex gap-10 items-center'>
               <h2 className='text-2xl font-semibold'>Event list</h2>
               <AdminButton click={() => setIsShowModal(true)}>
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
                                 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                    {eventItem.images.map((img) => (
                                       <img src={img} className='w-[200px]'></img>
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

                              {/* Date start and end */}
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-right'>
                                 <div className='flex flex-col items-start'>
                                    <span>{moment(eventItem.startDate).format('DD/MM/YYYY')}</span>
                                    <span>-</span>
                                    <span>{moment(eventItem.endDate).format('DD/MM/YYYY')}</span>
                                 </div>
                              </td>

                              {/* edit */}
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-right'>
                                 <button
                                    data-tooltip-target='tooltip-light'
                                    data-tooltip-style='light'
                                    type='button'
                                    onClick={() => handleClickEditEvent(eventItem)}
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
            <AdminModal title='Create new Event' showFooter={false} className='w-[800px] pb-2'>
               <ModalCreateEvent
                  cancel={() => setIsShowModal(false)}
                  handleCreateEvent={handleCreateEvent}
               />
            </AdminModal>
         )}

         {isLoading && <LoadingActionPage />}
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
