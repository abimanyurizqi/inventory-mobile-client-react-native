
import {LOGIN_TOKEN_REQUEST,
LOGIN_TOKEN_SUCCESS,
LOGIN_TOKEN_FAILURE} from '../actions/constants';
import { AsyncStorage } from 'react-native';
const defaultState = { data: null, loading: false, error: null }

export function logged(state = defaultState, action) {

    switch (action.type) {
        case LOGIN_TOKEN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case LOGIN_TOKEN_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case LOGIN_TOKEN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}