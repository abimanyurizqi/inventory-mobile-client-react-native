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
const defaultState = { data: null, loading: false, error: null }

export function deletedTransactionById(state = defaultState, action) {

    switch (action.type) {
        case DELETE_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_TRANSACTION_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case DELETE_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function addedTransaction(state = defaultState, action) {

    switch (action.type) {
        case ADD_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_TRANSACTION_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case ADD_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function editedTransaction(state = defaultState, action) {

    switch (action.type) {
        case UPDATE_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_TRANSACTION_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case UPDATE_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}


export function transactionById(state = defaultState, action) {
    switch (action.type) {
        case FIND_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_TRANSACTION_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

// export function findTransactionImage(state = defaultState, action) {
//     switch (action.type) {
//         case FIND_TRANSACTION_IMAGE_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null
//             };
//         case FIND_TRANSACTION_IMAGE_SUCCESS:
//             return {
//                 data: action.data,
//                 loading: false,
//                 error: null
//             };
//         case FIND_TRANSACTION_IMAGE_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.error
//             };
//         default:
//             return state;
//     }

// }

// export function uploadTransactionImage(state = defaultState, action) {

//     switch (action.type) {
//         case UPLOAD_TRANSACTION_IMAGE_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null
//             };
//         case UPLOAD_TRANSACTION_IMAGE_SUCCESS:
//             return {
//                 data: action.data,
//                 loading: false,
//                 error: null
//             };
//         case UPLOAD_TRANSACTION_IMAGE_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.error
//             };
//         default:
//             return state;
//     }

// }

// export function deleteTransactionImage(state = defaultState, action) {

//     switch (action.type) {
//         case DELETE_TRANSACTION_IMAGE_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null
//             };
//         case DELETE_TRANSACTION_IMAGE_SUCCESS:
//             return {
//                 data: action.data,
//                 loading: false,
//                 error: null
//             };
//         case DELETE_TRANSACTION_IMAGE_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.error
//             };
//         default:
//             return state;
//     }

// }



export function transactions(state = defaultState, action) {
    switch (action.type) {
        case FIND_TRANSACTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_TRANSACTIONS_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_TRANSACTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}

export function summariedTransactions(state = defaultState, action) {
    switch (action.type) {
        case SUMMARY_TRANSACTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SUMMARY_TRANSACTIONS_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case SUMMARY_TRANSACTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }

}