import {
    FIND_TRANSACTION_REQUEST,

    FIND_TRANSACTIONS_REQUEST,
  
    DELETE_TRANSACTION_REQUEST,
 
    ADD_TRANSACTION_REQUEST,
 
    UPDATE_TRANSACTION_REQUEST,

    SUMMARY_TRANSACTIONS_REQUEST

} from './constants';



export function add(data){
    return{
        type: ADD_TRANSACTION_REQUEST,
        data:data
    }
}

export function edit(data){
    return{
        type: UPDATE_TRANSACTION_REQUEST,
        data:data
    }
}

export function deleteById(id){
    return{
        type: DELETE_TRANSACTION_REQUEST,
        id:id
    }
}

export function findById(id){
    return{
        type: FIND_TRANSACTION_REQUEST,
        id:id
    }
}

export function findAll(params){
    return{
        type: FIND_TRANSACTIONS_REQUEST,
        params:params
    }
}

export function summary(params){
    return{
        type: SUMMARY_TRANSACTIONS_REQUEST,
        params:params
    }
}