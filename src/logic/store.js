import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import mainSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

//Configure store
const configureStore = () => {
  const store = createStore(reducer,
    applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(mainSaga)

  // store.subscribe(() => console.log(store.getState()))

  return store;
}


export default configureStore;