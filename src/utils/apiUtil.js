import { AsyncStorage } from 'react-native';

const axios = require('axios');

function sleep(delay, value) {
  return new Promise(function (resolve) {
      setTimeout(resolve, delay, value);
  });
}

const commonAxios = axios.create({
    baseURL: 'http://10.0.3.2:8080/' || 'http://10.0.2.2:8080/'
});

commonAxios.interceptors.request.use( async config => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers.Authorization = "Bearer "+token
    }
    return config;
  },error => {
    return Promise.reject(error)
  });

commonAxios.interceptors.response.use(function (response) {
    const { data } = response;
    
    if (data.code !== 0) {
        const error = new Error(data.message || 'Unknown error');
        error.data = data.data;
        throw error;
    }
    return data.data  
}, function (error) {
    return Promise.reject(error);
});

export { commonAxios };