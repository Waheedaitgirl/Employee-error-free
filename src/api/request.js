import axios from 'axios';
import { useSelector } from 'react-redux';
const service = axios.create({
  baseURL:'http://3d95-203-82-55-110.ngrok.io/',
  timeout: 50000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  async config => {
    config.headers['Authorization'] = '';
  //  const {token} = useSelector(state => state.LoginReducer)
  //   console.log(token);
    if (true) {
      config.headers['Authorization'] =  'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response;

    // if the custom code is not 200, it is judged as an error.
    if (res.status != '200') {
      return Promise.reject(new Error(res.data || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    return Promise.reject(error.response);
  },
);

export default service;

// By Aftab Ameen