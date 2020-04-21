import {
    FIND_UNIT_REQUEST,
    FIND_UNIT_SUCCESS,
    FIND_UNIT_FAILURE,
    FIND_UNITS_REQUEST,
    FIND_UNITS_SUCCESS,
    FIND_UNITS_FAILURE,
    DELETE_UNIT_SUCCESS,
    DELETE_UNIT_REQUEST,
    DELETE_UNIT_FAILURE,
    ADD_UNIT_SUCCESS,
    ADD_UNIT_REQUEST,
    ADD_UNIT_FAILURE,
    UPDATE_UNIT_SUCCESS,
    UPDATE_UNIT_REQUEST,
    UPDATE_UNIT_FAILURE,

} from "../actions/constants";
import { commonAxios } from '../utils/apiUtil';
import { put, takeLatest } from 'redux-saga/effects'

// saga worker
function* findAll(action) {
    const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
    try {
        const data = yield commonAxios.get('units', {
            params: { ...search, sort, page, size }
        });
        yield put({
            type: FIND_UNITS_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: FIND_UNITS_FAILURE,
            error: error
        });
    }
}

function* add(action) {
    const { name, description} = action.data;
    try {
        const data = yield commonAxios.post('units', {
            name: name,
            description: description

        });
        yield put({
            type: ADD_UNIT_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: ADD_UNIT_FAILURE,
            error: error
        });
    }

}

function* edit(action) {
    const {id, name, description} = action.data;
    try {
        const data = yield commonAxios.put(`units/${id}`, {
            name: name,
            description: description
        });
        yield put({
            type: UPDATE_UNIT_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: UPDATE_UNIT_FAILURE,
            error: error
        });
    }

}

function* findById(action) {
   try {
        const data = yield commonAxios.get(`units/${action.id}`);
        yield put({
            type: FIND_UNIT_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: FIND_UNIT_FAILURE,
            error: error
        });
    }
}

function* deleteById(action) {
    try {
         const data = yield commonAxios.delete(`units/${action.id}`);
         yield put({
             type: DELETE_UNIT_SUCCESS,
             data: data
         });
 
     } catch (error) {
         yield put({
             type: DELETE_UNIT_FAILURE,
             error: error
         });
     }
 }


//saga watcher
export function* watchDeleteUnitById(){
    yield takeLatest(DELETE_UNIT_REQUEST, deleteById);
}

export function* watchAddUnit(){
    yield takeLatest(ADD_UNIT_REQUEST, add);
}
export function* watchEditUnit(){
    yield takeLatest(UPDATE_UNIT_REQUEST, edit);
}

export function* watchFindUnitById(){
    yield takeLatest(FIND_UNIT_REQUEST, findById);
}

export function* watchFindUnits() {
    yield takeLatest(FIND_UNITS_REQUEST, findAll);
}