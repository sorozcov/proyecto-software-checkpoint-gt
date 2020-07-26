import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
} from 'redux-saga/effects';

import { AsyncStorage } from 'react-native';
import * as selectors from '../src/reducers';
import * as actions from '../src/actions/loggedUser';
import * as types from '../src/types/loggedUser';



function* loginStarted(action) {
    try {
        yield AsyncStorage.setItem('userCheckpoint', JSON.stringify(action.payload));
    } catch (error) {
        console.log("Error async storage setting userCheckpoint")
        
    }
}

export function* watchLoginStarted(){
    yield takeEvery(
        types.USER_LOGGED_IN,
        loginStarted,
    );
}




function* logoffStarted(action) {
    try {
        yield AsyncStorage.removeItem('userCheckpoint');
        console.log("remove")
    } catch (error) {
        console.log("Error async storage setting userCheckpoint")
        
    }
}

export function* watchLogoffStarted(){
    yield takeEvery(
        types.USER_LOGGED_OFF,
        logoffStarted,
    );
}