import { AsyncStorage } from 'react-native';
import { takeEvery } from 'redux-saga/effects';
import * as types from '../types/loggedUser';




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