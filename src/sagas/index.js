import  { watchFindItems, watchDeleteItemById, watchAddItem, watchFindItemById, watchEditItem, watchFindItemImage } from './items';
import  { watchFindUnits, watchDeleteUnitById, watchAddUnit, watchFindUnitById, watchEditUnit } from './units';
import  { watchFindStocks, watchDeleteStockById, watchAddStock, watchFindStockById, watchEditStock, watchSummaryStocks } from './stocks';
import {watchFindTransactions, watchDeleteTransactionById, watchAddTransaction, watchFindTransactionById, watchEditTransaction, watchSummaryTransactions} from './transactions'
import {watchLogin} from './login';
import { all , fork } from 'redux-saga/effects';

export default function* rootSaga(){
    yield all([
        fork(watchFindItems),
        fork(watchFindItemById),
        fork(watchAddItem),
        fork(watchEditItem),
        fork(watchDeleteItemById),
        fork(watchFindItemImage),

        fork(watchFindUnits),
        fork(watchFindUnitById),
        fork(watchAddUnit),
        fork(watchEditUnit),
        fork(watchDeleteUnitById),

        fork(watchFindStocks),
        fork(watchFindStockById),
        fork(watchAddStock),
        fork(watchEditStock),
        fork(watchDeleteStockById),
        fork(watchSummaryStocks),

        fork(watchFindTransactions), 
        fork(watchDeleteTransactionById), 
        fork(watchAddTransaction), 
        fork(watchFindTransactionById), 
        fork(watchEditTransaction),
        fork(watchSummaryTransactions),

        fork(watchLogin)

      
    ]);
}

