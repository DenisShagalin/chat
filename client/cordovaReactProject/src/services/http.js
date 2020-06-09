import axios from 'axios';
import qs from 'qs';

const apiRoot = process.env.REACT_APP_API;

export default function http({
  method, url, data, params,
}) {
  const token = localStorage.getItem('auth');
  const config = {
    method: method.toLowerCase(),
    url: apiRoot + url,
    params,
    paramsSerializer: function (p) {
      return qs.stringify(p, { arrayFormat: 'repeat' });
    },
  };
  if (data) config['data'] = data;
  config['headers'] = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
  if (token) {
    config['headers'] = {
      'Authorization': 'Bearer ' + token,
    };
  }
  return axios(config);
}
