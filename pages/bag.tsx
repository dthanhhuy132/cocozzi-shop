import {useDispatch} from 'react-redux';
import {Bag} from '../components/Bag';

export default function BagPage({carts = []}) {
   return <Bag carts={carts} />;
}
