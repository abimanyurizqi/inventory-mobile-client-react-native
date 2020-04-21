import {
    FIND_STOCK_REQUEST,
    FIND_STOCK_SUCCESS,
    FIND_STOCK_FAILURE,
    FIND_STOCKS_REQUEST,
    FIND_STOCKS_SUCCESS,
    FIND_STOCKS_FAILURE,
    DELETE_STOCK_SUCCESS,
    DELETE_STOCK_REQUEST,
    DELETE_STOCK_FAILURE,
    ADD_STOCK_SUCCESS,
    ADD_STOCK_REQUEST,
    ADD_STOCK_FAILURE,
    UPDATE_STOCK_SUCCESS,
    UPDATE_STOCK_REQUEST,
    UPDATE_STOCK_FAILURE,
    SUMMARY_STOCKS_REQUEST,
    SUMMARY_STOCKS_FAILURE,
    SUMMARY_STOCKS_SUCCESS

} from "../actions/constants";
import { commonAxios } from '../utils/apiUtil';
import { put, takeLatest } from 'redux-saga/effects'

// saga worker
function* findAll(action) {
    const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
    try {
        const data = yield commonAxios.get('stocks', {
            params: { ...search, sort, page, size }
        });
        yield put({
            type: FIND_STOCKS_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: FIND_STOCKS_FAILURE,
            error: error
        });
    }
}

function* summary() {

    try {
        const data = yield commonAxios.get('stocks/summary');
        yield put({
            type: SUMMARY_STOCKS_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: SUMMARY_STOCKS_FAILURE,
            error: error
        });
    }
}

function* add(action) {
    const { item, quantity, unit} = action.data;
    try {
        const data = yield commonAxios.post('stocks', {
            itemId: item.id,
            quantity: quantity,
            unitId: unit.id
        });
        yield put({
            type: ADD_STOCK_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: ADD_STOCK_FAILURE,
            error: error
        });
    }

}

function* edit(action) {
    const {id, item, quantity, unit} = action.data;
    try {
        const data = yield commonAxios.put(`stocks/${id}`, {
            itemId: item.id,
            quantity: quantity,
            unitId: unit.id
        });
        yield put({
            type: UPDATE_STOCK_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: UPDATE_STOCK_FAILURE,
            error: error
        });
    }

}

function* findById(action) {
    try {
         const data = yield commonAxios.get(`stocks/${action.id}`);
         yield put({
             type: FIND_STOCK_SUCCESS,
             data: data
         });
     } catch (error) {
         yield put({
             type: FIND_STOCK_FAILURE,
             error: error
         });
     }
 }

function* deleteById(action) {
    try {
         const data = yield commonAxios.delete(`stocks/${action.id}`);
         yield put({
             type: DELETE_STOCK_SUCCESS,
             data: data
         });
 
     } catch (error) {
         yield put({
             type: DELETE_STOCK_FAILURE,
             error: error
         });
     }
 }


//saga watcher
export function* watchDeleteStockById(){
    yield takeLatest(DELETE_STOCK_REQUEST, deleteById);
}

export function* watchAddStock(){
    yield takeLatest(ADD_STOCK_REQUEST, add);
}
export function* watchEditStock(){
    yield takeLatest(UPDATE_STOCK_REQUEST, edit);
}

export function* watchFindStockById(){
    yield takeLatest(FIND_STOCK_REQUEST, findById);
}

export function* watchFindStocks() {
    yield takeLatest(FIND_STOCKS_REQUEST, findAll);
}

export function* watchSummaryStocks(){
    yield takeLatest(SUMMARY_STOCKS_REQUEST, summary);
}