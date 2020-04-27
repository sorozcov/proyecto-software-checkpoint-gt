import { createStore } from 'redux';

import reducer from './src/reducers';


const configureStore = () => {
  const store = createStore(reducer);
  return store;
}

export default configureStore;