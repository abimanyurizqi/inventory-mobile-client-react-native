import { combineReducers } from 'redux'
import { itemById, items, deletedItemById, addedItem, editedItem, itemImage } from './items';
import { unitById, units, deletedUnitById, addedUnit, editedUnit } from './units';
import { stockById, stocks, deletedStockById, addedStock, editedStock, summariedStocks } from './stocks';
import {transactionById, transactions, deletedTransactionById, addedTransaction,editedTransaction, summariedTransactions} from './transactions';
import {logged} from './login'

export default combineReducers({
    deletedItemById,
    itemById,
    items,
    addedItem,
    editedItem,
    itemImage,
    
    unitById, 
    units, 
    deletedUnitById, 
    addedUnit, 
    editedUnit,

    stockById, 
    stocks, 
    deletedStockById, 
    addedStock, 
    editedStock,
    summariedStocks,

    transactionById, 
    transactions, 
    deletedTransactionById, 
    addedTransaction,
    editedTransaction,
    summariedTransactions,

    logged
});