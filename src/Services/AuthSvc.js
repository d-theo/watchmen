import {User} from '../Models/User.js';

const ATTOKEN = 'ATToken';

class AuthSvc {    
  constructor(config){
    this.config = config;
    this.profile = null;
    this.events = {};
  }

  on(event, callback, opts) {
    if (this.events[event]) {
      this.events[event].push(callback);
    } else {
      this.events[event] = [callback];
    }

    if (opts.fireImmediate) {
      this.isAuthed() && this.fire('login');
      !this.isAuthed() && this.fire('logout');
    }
  }

  fire(eventName) {
    const events = this.events[eventName] || [];
    events.forEach(e => e());
  }

  authenticateUser(credential) {
    return fetch(this.config.satelliteUrl + '/authentication/authentication?include={scope}', { 
      method: 'GET',
      headers: new Headers({
        Authorization: 'Basic ' + btoa(credential.email + ':' + credential.password),
        Accept: 'application/json',
        'AT-APP': this.config['AT-APP']
      }),
      mode: 'cors'
    }).then((response) => {
      if(response.ok) {
        return response.json().then(profile => {
          this.profile = new User(profile);
          this.fire('login');
          return profile;
        }).catch(err => console.log(err));
      } else {
        return new Error('Not authentified');
      }
    }).catch(error => new Error(error));
  }    

  fetchProfile() {
    return new Promise( (resolve, reject) => {
      if (this.profile) resolve(this.profile);
      let tok = localStorage.getItem(ATTOKEN);
      if(!tok) reject('no token');

      fetch('https://sat-dtc-dev-bod.atinternet-solutions.com/rest/config/v1_omega/users/profile?include={betamode}', {
        method: 'GET',
        headers: new Headers({
          'Authorization': tok,
          'Accept': 'application/json',
          'AT-APP': this.config['AT-APP']
        }),
        mode: 'cors'
      })
      .then((response) => {
        if(response.ok) {
          response.json().then(profile => {
            this.profile = new User(profile);
            resolve(this.profile);
          });
        } else {
          reject(new Error('Not authentified'));
        }
      })
      .catch(err => reject(new Error(err)));
    });
  }

  logout() {
    this.profile = null;
    localStorage.removeItem(ATTOKEN);
    this.fire('logout');
  }

  isAuthed() {
    if (this.profile || localStorage.getItem(ATTOKEN)) {
      !this.profile && this.fetchProfile();
      this.fire('login');
      return true;
    } else {
      return false;
    }
  }

  saveToken(token){
    localStorage.setItem(ATTOKEN, `Token ${token}`);
  }
}

export let authSvc = new AuthSvc({
  satelliteUrl: 'https://sat-dtc-dev-bod.atinternet-solutions.com/rest/config/v1_bdev',
  'AT-APP': 22
});

const ATURL = {
  dev: 'https://sat-dtc-dev-bod.atinternet-solutions.com/rest/config/v1_bdev',
  prod: 'https://apirest.atinternet-solutions.com/rest/config/v1/authentication/authentication/'
};