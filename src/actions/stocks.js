import {
    FIND_STOCK_REQUEST,

    FIND_STOCKS_REQUEST,
  
    DELETE_STOCK_REQUEST,
 
    ADD_STOCK_REQUEST,
 
    UPDATE_STOCK_REQUEST,

    SUMMARY_STOCKS_REQUEST

} from './constants';



export function add(data){
    return{
        type: ADD_STOCK_REQUEST,
        data:data
    }
}

export function edit(data){
    return{
        type: UPDATE_STOCK_REQUEST,
        data:data
    }
}

export function deleteById(id){
    return{
        type: DELETE_STOCK_REQUEST,
        id:id
    }
}

export function findById(id){
    return{
        type: FIND_STOCK_REQUEST,
        id:id
    }
}

export function findAll(params){
    return{
        type: FIND_STOCKS_REQUEST,
        params:params
    }
}

export function summary(){
    return{
        type: SUMMARY_STOCKS_REQUEST,
    }
}