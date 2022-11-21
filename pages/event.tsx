import {GetServerSideProps} from 'next';
import {Event} from '../components/Event';
import {Logo} from '../components/Logo';
import eventApi from '../service/eventApi';

export default function EventPage({allEvents}) {
   return (
      <>
         <p className='hidden md:block uppercase text-center my-10'>Event</p>
         <div className='mt-10 md:mt-[unset] text-center mb-7'>
            <Logo width='190' height='40' />
         </div>
         <Event></Event>
      </>
   );
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
   try {
      const responseAllEvent = await eventApi.getAllEvent();

      return {
         props: {
            allEvents: responseAllEvent.data.data || [],
            error: false,
         },
      };
   } catch (error) {
      return {
         props: {
            error: true,
         },
      };
   }
};
