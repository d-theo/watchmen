import {BehaviorSubject} from 'rx-lite';
import {api} from './Api.js';

export class UserConfiguration {
  constructor() {
    this.configuration$ = new BehaviorSubject({mail:'', slack:'',ifttt:''});
  }
  stream() {
    return this.configuration$.asObservable();
  }
  fetch() {
    api.get('/configs').then(conf => {
      conf.data.email = arrayToStr(conf.data.email);
      this.configuration$.onNext(conf.data);
    });
  }
  set(config) {
    return new Promise((resolve, reject) => {
      config.email = mailWithCommaToArray(config.email);
      config.slack = preventEmpty(config.slack);
      config.ifttt = preventEmpty(config.ifttt); 
      api.post('/configs/add', config).then(() => {
        config.email = arrayToStr(config.email);
        config.slack = config.slack || '';
        config.ifttt = config.ifttt || ''; 
        this.configuration$.onNext(config);
        resolve();
      });
    });
  }
}
const preventEmpty = (str) => {
  if (str === '') {
    return undefined;
  }
  return str;
}

const mailWithCommaToArray = (mailStr) => {
  if (mailStr === '') {
    return undefined;
  }

  return mailStr.split(';');
};

const arrayToStr = (array) => {
  if (!array || array.length === 0) {
    return '';
  }
  return array.join(';');
};

export const userConfiguration = new UserConfiguration();