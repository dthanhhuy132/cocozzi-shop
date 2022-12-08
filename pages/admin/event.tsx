import {AdminLayout} from '../../components/Admin';
import {useAppSelector} from '../../store';

export default function AdminEventPage() {
   const {eventState} = useAppSelector((state) => state.event);

   return <AdminLayout>This is event page</AdminLayout>;
}
