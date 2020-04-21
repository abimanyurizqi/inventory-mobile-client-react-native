import React from 'react';
import {Toast} from 'native-base';

export function showError(error){
    Toast.show({
        text: error.message,
        buttonText: "OK",
        type: "danger",
        duration: 4000
    })
}

export function showSuccess(word){
    Toast.show({
        text: word,
        buttonText: "OK",
        type: "success",
        duration: 4000
    })
}