import {Event} from '../components/Event';
import {Logo} from '../components/Logo';

export default function EventPage() {
   return (
      <>
         <p className='hidden md:block uppercase text-center my-10'>Event</p>
         <div className='mt-10 md:mt-[unset] text-center mb-7'>
            <Logo width='190' height='30' />
         </div>
         <Event></Event>
      </>
   );
}
