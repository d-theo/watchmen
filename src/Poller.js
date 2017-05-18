import axios from 'axios';

class Poller {
  constructor(){
    this.interval = null;
  }

  start(){
    this.interval = setInterval(this.fetch, 10*1000)
  }

  fetch(){
    console.log("interval")
    axios.get("https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/alerts")
      .then(response => {
        console.log(response);
        var ev = new Event("AlertPolled");
        ev.data = response.data;
        document.dispatchEvent(ev);
      }).catch(e => {
      console.log(e)
    })

  }
}

export let poller = new Poller();
