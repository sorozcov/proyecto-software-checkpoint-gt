import { AsyncStorage } from 'react-native';
import { takeEvery } from 'redux-saga/effects';
import * as types from '../types/loggedUser';
import { suscribeToFirebase,unsuscribeToFirebase } from '../../database/firebase/suscribeChanges';
import { suscribeFirebase } from '../../../config';




function* loginStarted(action) {
    try {
        yield AsyncStorage.setItem('userCheckpoint', JSON.stringify(action.payload));

        
    } catch (error) {
        console.log(error)
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
        if(suscribeFirebase){
            yield unsuscribeToFirebase()
            console.log("unsuscribed")
        }
    } catch (error) {
        console.log(error)
        console.log("Error async storage setting userCheckpoint")
        
    }
}

export function* watchLogoffStarted(){
    yield takeEvery(
        types.USER_LOGGED_OFF,
        logoffStarted,
    );
}