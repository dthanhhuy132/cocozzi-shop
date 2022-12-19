import {Event} from '../components/Event';
import {LoadingPage} from '../components/LoadingPage';
import {Logo} from '../components/Logo';

export default function EventPage() {
   return (
      <>
         <LoadingPage>
            <Logo />
            <p>Những sự kiện nổi bật</p>
         </LoadingPage>
         <p className='hidden md:block uppercase text-center my-10'>Event</p>
         <div className='mt-10 md:mt-[unset] text-center mb-7'>
            <Logo width='190' height='40' />
         </div>
         <Event></Event>
      </>
   );
}
