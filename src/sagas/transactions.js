import {
    FIND_TRANSACTION_REQUEST,
    FIND_TRANSACTION_SUCCESS,
    FIND_TRANSACTION_FAILURE,
    FIND_TRANSACTIONS_REQUEST,
    FIND_TRANSACTIONS_SUCCESS,
    FIND_TRANSACTIONS_FAILURE,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_REQUEST,
    DELETE_TRANSACTION_FAILURE,
    ADD_TRANSACTION_SUCCESS,
    ADD_TRANSACTION_REQUEST,
    ADD_TRANSACTION_FAILURE,
    UPDATE_TRANSACTION_SUCCESS,
    UPDATE_TRANSACTION_REQUEST,
    UPDATE_TRANSACTION_FAILURE,
    SUMMARY_TRANSACTIONS_REQUEST,
    SUMMARY_TRANSACTIONS_SUCCESS,
    SUMMARY_TRANSACTIONS_FAILURE

} from "../actions/constants";
import { commonAxios } from '../utils/apiUtil';
import { put, takeLatest } from 'redux-saga/effects'

// saga worker
function* findAll(action) {
    const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
    try {
        const data = yield commonAxios.get('transactions', {
            params: { ...search, sort, page, size }
        });
        yield put({
            type: FIND_TRANSACTIONS_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: FIND_TRANSACTIONS_FAILURE,
            error: error
        });
    }
}

function* summary(action) {
    const { year = null, month = null, date = null } = action.params || {};
    try {
        const data = yield commonAxios.get('transactions/summary', {
            params: { year, month, date }
        });
        yield put({
            type: SUMMARY_TRANSACTIONS_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: SUMMARY_TRANSACTIONS_FAILURE,
            error: error
        });
    }
}

function* add(action) {
    const { amount, description, typeTransaction} = action.data;
    try {
        const data = yield commonAxios.post('transactions', {
            amount: amount,
            description: description,
            typeTransaction: typeTransaction

        });
        yield put({
            type: ADD_TRANSACTION_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: ADD_TRANSACTION_FAILURE,
            error: error
        });
    }

}

function* edit(action) {
    const {id, amount, description, typeTransaction} = action.data;
    try {
        const data = yield commonAxios.put(`transactions/${id}`, {
            amount: amount,
            description:description,
            typeTransaction: typeTransaction
        });
        yield put({
            type: UPDATE_TRANSACTION_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: UPDATE_TRANSACTION_FAILURE,
            error: error
        });
    }

}

function* findById(action) {
   try {
        const data = yield commonAxios.get(`transactions/${action.id}`);
        yield put({
            type: FIND_TRANSACTION_SUCCESS,
            data: data
        });

    } catch (error) {
        yield put({
            type: FIND_TRANSACTION_FAILURE,
            error: error
        });
    }
}

function* deleteById(action) {
    try {
         const data = yield commonAxios.delete(`transactions/${action.id}`);
         yield put({
             type: DELETE_TRANSACTION_SUCCESS,
             data: data
         });
 
     } catch (error) {
         yield put({
             type: DELETE_TRANSACTION_FAILURE,
             error: error
         });
     }
 }


//saga watcher
export function* watchDeleteTransactionById(){
    yield takeLatest(DELETE_TRANSACTION_REQUEST, deleteById);
}

export function* watchAddTransaction(){
    yield takeLatest(ADD_TRANSACTION_REQUEST, add);
}
export function* watchEditTransaction(){
    yield takeLatest(UPDATE_TRANSACTION_REQUEST, edit);
}

export function* watchFindTransactionById(){
    yield takeLatest(FIND_TRANSACTION_REQUEST, findById);
}

export function* watchFindTransactions() {
    yield takeLatest(FIND_TRANSACTIONS_REQUEST, findAll);
}

export function* watchSummaryTransactions() {
    yield takeLatest(SUMMARY_TRANSACTIONS_REQUEST, summary);
}