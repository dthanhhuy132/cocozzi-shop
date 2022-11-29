import {createGlobalState} from 'react-hooks-global-state';
const initialState = {
   isShowChat: true,
};

const {useGlobalState} = createGlobalState(initialState);

export default useGlobalState;
