import {
    FIND_ITEM_REQUEST,
    FIND_ITEM_SUCCESS,
    FIND_ITEM_FAILURE,
    FIND_ITEMS_REQUEST,
    FIND_ITEMS_SUCCESS,
    FIND_ITEMS_FAILURE,
    FIND_ITEM_IMAGE_REQUEST,
    FIND_ITEM_IMAGE_SUCCESS,
    FIND_ITEM_IMAGE_FAILURE,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_FAILURE,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_REQUEST,
    ADD_ITEM_FAILURE,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_FAILURE,

} from "../actions/constants";
import { commonAxios } from '../utils/apiUtil';
import { put, takeLatest } from 'redux-saga/effects'

// saga worker
function* findAll(action) {
    const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
    try {
        const data = yield commonAxios.get('items', {
            params: { ...search, sort, page, size }
        });
        yield put({
            type: FIND_ITEMS_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: FIND_ITEMS_FAILURE,
            error: error
        });
    }
}

function* add(action) {
    const { name} = action.data;
    try {
        const data = yield commonAxios.post('items', {
            name: name
        });
        yield put({
            type: ADD_ITEM_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: ADD_ITEM_FAILURE,
            error: error
        });
    }

}

function* edit(action) {
    const {id, name} = action.data;
    try {
        const data = yield commonAxios.put(`items/${id}`, {
            name: name
        });
        yield put({
            type: UPDATE_ITEM_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: UPDATE_ITEM_FAILURE,
            error: error
        });
    }

}

function* findById(action) {
   try {
        const data = yield commonAxios.get(`items/${action.id}`);
        yield put({
            type: FIND_ITEM_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: FIND_ITEM_FAILURE,
            error: error
        });
    }
}

function* findImageById(action) {
    try {
         const data = yield commonAxios.get(`items/${action.id}/images`);
         yield put({
             type: FIND_ITEM_IMAGE_SUCCESS,
             data: data
         });
 
     } catch (error) {
         yield put({
             type: FIND_ITEM_IMAGE_FAILURE,
             error: error
         });
     }
 }

function* deleteById(action) {
    try {
         const data = yield commonAxios.delete(`items/${action.id}`);
         yield put({
             type: DELETE_ITEM_SUCCESS,
             data: data
         });
 
     } catch (error) {
         yield put({
             type: DELETE_ITEM_FAILURE,
             error: error
         });
     }
 }


//saga watcher
export function* watchDeleteItemById(){
    yield takeLatest(DELETE_ITEM_REQUEST, deleteById);
}

export function* watchAddItem(){
    yield takeLatest(ADD_ITEM_REQUEST, add);
}
export function* watchEditItem(){
    yield takeLatest(UPDATE_ITEM_REQUEST, edit);
}

export function* watchFindItemById(){
    yield takeLatest(FIND_ITEM_REQUEST, findById);
}

export function* watchFindItems() {
    yield takeLatest(FIND_ITEMS_REQUEST, findAll);
}

export function* watchFindItemImage() {
    yield takeLatest(FIND_ITEM_IMAGE_REQUEST, findImageById);
}