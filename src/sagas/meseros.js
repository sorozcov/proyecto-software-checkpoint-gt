import {
    //call,
    takeEvery,
    put,
    //delay,
    //select,
} from 'redux-saga/effects';
  
//import * as selectors from '../reducers';
import * as actions from '../actions/meseros';
import * as types from '../types/meseros';

import { getUsers } from '../../firebase/users';

function* fetchMeseros(action) {
    try {
        const users = getUsers();
        const meseros = (await users).map(user => user.type === 'Mesero')

        const order = meseros.map(mesero => mesero.uid)
        const entities = {}
        meseros.map(mesero => entities[mesero.id] = mesero)

        yield put(actions.completeFetchingMeseros(entities, order))
    } catch (error) {
        yield put(actions.failFetchingMeseros('Falló el fetch de meseros'))
    }
}

export function* watchFetchMeserosStarted() {
    yield takeEvery(
        types.MESEROS_FETCH_STARTED,
        fetchMeseros,
    );
}

export async function deleteMeseros(meseroID){

    firebase.firestore()
        .collection('Meseros')
        .doc(meseroID).delete()
        .then(() => deleteComplete())
        .catch(error => console.log(error))
}