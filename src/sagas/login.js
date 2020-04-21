import {LOGIN_TOKEN_FAILURE,
LOGIN_TOKEN_REQUEST,
LOGIN_TOKEN_SUCCESS} from '../actions/constants';

import { commonAxios } from '../utils/apiUtil';
import { put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

function sleep(delay, value) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay, value);
    });
  }

function* login(action) {
    const { username, password } = action.data;
    
    try {
        const data = yield commonAxios.post('auth/signin', {
            username: username,
            password: password
        }).then( async (data) => {
            const result = data?.token || null
            const username = data?.username || null
            await AsyncStorage.setItem("token", result)
            await AsyncStorage.setItem("username", username)
        })
        yield put({
            type: LOGIN_TOKEN_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: LOGIN_TOKEN_FAILURE,
            error: error
        });
    }

}

export function* watchLogin(){
    yield takeLatest(LOGIN_TOKEN_REQUEST, login);
}