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
const defaultState = { data: null, loading: false, error: null }

export function deletedItemById(state = defaultState, action) {

    switch (action.type) {
        case DELETE_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_ITEM_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case DELETE_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function addedItem(state = defaultState, action) {

    switch (action.type) {
        case ADD_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_ITEM_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case ADD_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function editedItem(state = defaultState, action) {

    switch (action.type) {
        case UPDATE_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_ITEM_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case UPDATE_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}


export function itemById(state = defaultState, action) {
    switch (action.type) {
        case FIND_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_ITEM_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}


export function itemImage(state = defaultState, action) {
    switch (action.type) {
        case FIND_ITEM_IMAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_ITEM_IMAGE_SUCCESS:
            return {
                data: action.data[0],
                loading: false,
                error: null
            };
        case FIND_ITEM_IMAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

// export function uploadItemImage(state = defaultState, action) {

//     switch (action.type) {
//         case UPLOAD_ITEM_IMAGE_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null
//             };
//         case UPLOAD_ITEM_IMAGE_SUCCESS:
//             return {
//                 data: action.data,
//                 loading: false,
//                 error: null
//             };
//         case UPLOAD_ITEM_IMAGE_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.error
//             };
//         default:
//             return state;
//     }

// }

// export function deleteItemImage(state = defaultState, action) {

//     switch (action.type) {
//         case DELETE_ITEM_IMAGE_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null
//             };
//         case DELETE_ITEM_IMAGE_SUCCESS:
//             return {
//                 data: action.data,
//                 loading: false,
//                 error: null
//             };
//         case DELETE_ITEM_IMAGE_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.error
//             };
//         default:
//             return state;
//     }

// }



export function items(state = defaultState, action) {
    switch (action.type) {
        case FIND_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_ITEMS_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}