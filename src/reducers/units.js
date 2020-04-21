import {
    FIND_UNIT_REQUEST,
    FIND_UNIT_SUCCESS,
    FIND_UNIT_FAILURE,
    FIND_UNITS_REQUEST,
    FIND_UNITS_SUCCESS,
    FIND_UNITS_FAILURE,
    DELETE_UNIT_SUCCESS,
    DELETE_UNIT_REQUEST,
    DELETE_UNIT_FAILURE,
    ADD_UNIT_SUCCESS,
    ADD_UNIT_REQUEST,
    ADD_UNIT_FAILURE,
    UPDATE_UNIT_SUCCESS,
    UPDATE_UNIT_REQUEST,
    UPDATE_UNIT_FAILURE,
  
} from "../actions/constants";
const defaultState = { data: null, loading: false, error: null }

export function deletedUnitById(state = defaultState, action) {

    switch (action.type) {
        case DELETE_UNIT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_UNIT_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case DELETE_UNIT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function addedUnit(state = defaultState, action) {

    switch (action.type) {
        case ADD_UNIT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_UNIT_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case ADD_UNIT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function editedUnit(state = defaultState, action) {

    switch (action.type) {
        case UPDATE_UNIT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_UNIT_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case UPDATE_UNIT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}


export function unitById(state = defaultState, action) {
    switch (action.type) {
        case FIND_UNIT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_UNIT_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_UNIT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

// export function findUnitImage(state = defaultState, action) {
//     switch (action.type) {
//         case FIND_UNIT_IMAGE_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null
//             };
//         case FIND_UNIT_IMAGE_SUCCESS:
//             return {
//                 data: action.data,
//                 loading: false,
//                 error: null
//             };
//         case FIND_UNIT_IMAGE_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.error
//             };
//         default:
//             return state;
//     }

// }

// export function uploadUnitImage(state = defaultState, action) {

//     switch (action.type) {
//         case UPLOAD_UNIT_IMAGE_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null
//             };
//         case UPLOAD_UNIT_IMAGE_SUCCESS:
//             return {
//                 data: action.data,
//                 loading: false,
//                 error: null
//             };
//         case UPLOAD_UNIT_IMAGE_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.error
//             };
//         default:
//             return state;
//     }

// }

// export function deleteUnitImage(state = defaultState, action) {

//     switch (action.type) {
//         case DELETE_UNIT_IMAGE_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null
//             };
//         case DELETE_UNIT_IMAGE_SUCCESS:
//             return {
//                 data: action.data,
//                 loading: false,
//                 error: null
//             };
//         case DELETE_UNIT_IMAGE_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.error
//             };
//         default:
//             return state;
//     }

// }



export function units(state = defaultState, action) {
    switch (action.type) {
        case FIND_UNITS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_UNITS_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_UNITS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}