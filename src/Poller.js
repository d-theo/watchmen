export class Poller {
  constructor(){
    this.interval = null;
  }

  start(){
    this.interval = setInterval(this.fetch, 10*1000)
  }

  fetch(){
    console.log("interval")
  }
}
