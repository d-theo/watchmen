import {api} from './Api.js';

class Poller {
  constructor(){
    this.interval = null;
  }

  start(){
    this.interval = setInterval(this.fetch, 10*1000)
  }

  fetch(){
    api.get('/monitors')
      .then(response => {
        var ev = new Event('AlertPolled');
        ev.data = response.data;
        document.dispatchEvent(ev);
      }).catch(e => {
      console.log(e);
    })
  }
}
const p = new Poller();
export let poller = p;
