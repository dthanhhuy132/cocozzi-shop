import {useDispatch} from 'react-redux';
import {Bag} from '../components/Bag';

export default function BagPage({carts = []}) {
   const dispatch = useDispatch();

   return <Bag carts={carts} />;
}
