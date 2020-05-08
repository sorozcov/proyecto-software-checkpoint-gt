import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mainSaga from './sagas';
import reducer from './src/reducers';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

//Configure store
const configureStore = () => {
  const store = createStore(reducer,
    applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(mainSaga)
  return store;
}


export default configureStore;