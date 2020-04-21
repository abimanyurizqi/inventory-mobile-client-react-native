import {
  
    LOGIN_TOKEN_REQUEST,
 
} from './constants'


export function login(data){
    return{
        type: LOGIN_TOKEN_REQUEST,
        data:data
    }
}