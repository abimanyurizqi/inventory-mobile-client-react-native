import {
    FIND_UNIT_REQUEST,

    FIND_UNITS_REQUEST,
  
    DELETE_UNIT_REQUEST,
 
    ADD_UNIT_REQUEST,
 
    UPDATE_UNIT_REQUEST,

} from './constants';



export function add(data){
    return{
        type: ADD_UNIT_REQUEST,
        data:data
    }
}

export function edit(data){
    return{
        type: UPDATE_UNIT_REQUEST,
        data:data
    }
}

export function deleteById(id){
    return{
        type: DELETE_UNIT_REQUEST,
        id:id
    }
}

export function findById(id){
    return{
        type: FIND_UNIT_REQUEST,
        id:id
    }
}

export function findAll(params){
    return{
        type: FIND_UNITS_REQUEST,
        params:params
    }
}