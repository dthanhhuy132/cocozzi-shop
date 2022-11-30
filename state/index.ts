import {createGlobalState} from 'react-hooks-global-state';
const initialState = {
   token: '',
   currentUser: '',
};

const {useGlobalState} = createGlobalState(initialState);

export default useGlobalState;
