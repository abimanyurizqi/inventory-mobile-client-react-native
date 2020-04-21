import {
    FIND_ITEM_REQUEST,

    FIND_ITEM_IMAGE_REQUEST,

    FIND_ITEMS_REQUEST,
  
    DELETE_ITEM_REQUEST,
 
    ADD_ITEM_REQUEST,
 
    UPDATE_ITEM_REQUEST,

    UPLOAD_ITEM_IMAGE_REQUEST,
   
    DELETE_ITEM_IMAGE_REQUEST,
} from './constants';



export function add(data){
    return{
        type: ADD_ITEM_REQUEST,
        data:data
    }
}

export function edit(data){
    return{
        type: UPDATE_ITEM_REQUEST,
        data:data
    }
}

export function deleteById(id){
    return{
        type: DELETE_ITEM_REQUEST,
        id:id
    }
}

export function findById(id){
    return{
        type: FIND_ITEM_REQUEST,
        id:id
    }
}

export function findAll(params){
    return{
        type: FIND_ITEMS_REQUEST,
        params:params
    }
}

export function findImageById(id){
    return{
        type: FIND_ITEM_IMAGE_REQUEST,
        id:id
    }
}