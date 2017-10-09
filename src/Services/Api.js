import axios from 'axios';

const URL = {
  dev: 'https://watcher-api.dev.aws.atinternet-solutions.com',
  prod: 'https://watcher-api.atinternet-solutions.com'
};

const ATURL = {
  dev: 'https://sat-dtc-dev-bod.atinternet-solutions.com/rest/config/v1_bdev',
  prod: 'https://apirest.atinternet-solutions.com/rest/config/v1/authentication/authentication/'
};

let instance = axios.create({
  baseURL: URL[process.env.REACT_APP_ENV],
  timeout: 1000
});

const requestGetDelete = (method) => (endPoint) => instance[method](endPoint, {headers: {'Authorization': localStorage.getItem('ATToken')}});
const requestWithBody = (method) => (endPoint, data) => instance[method](endPoint, data, {headers: {'Authorization': localStorage.getItem('ATToken')}});

export const api = {
  get: requestGetDelete('get'),
  delete: requestGetDelete('delete'),
  post: requestWithBody('post'),
  put: requestWithBody('put')
};


export const sites = () => {
  return axios.get(ATURL[process.env.REACT_APP_ENV]+'/rights/sites',{headers: {'Authorization': localStorage.getItem('ATToken')}});
};

/* usage:
import {api} from '../Services/Api.js';
api.get('/configs').then(response => {
  console.log(response);
}).catch(err => console.log('error code > 400 : '+err));
*/