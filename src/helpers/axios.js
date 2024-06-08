import axios from 'axios';

export const axiosMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export const axiosRequest = (url, method, params, token) => {
  const axiosConfig = {
    url,
    method,
    headers: {}
  };

  if (method !== axiosMethod.GET) {
    axiosConfig.headers['Content-Type'] = `application/json`;
  }

  if (token) {
    axiosConfig.headers['authorization'] = `Bearer ${token}`;
    axiosConfig.headers['X-XSRF-TOKEN'] = token;
  }

  if(params) axiosConfig.params = params;

  return axios(axiosConfig);
};
