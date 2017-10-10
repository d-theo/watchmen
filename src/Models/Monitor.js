export class Monitor {
  constructor(o) {
    this.userId = o.userId;
    this.id = o.id;
    this.userName = o.userName;
    this.currentState = o.currentState;
    this.direction = o.direction;
    this.label = o.label;
    this.metricId = o.metricId;
    this.metricName = o.metricName;
    this.lastAlert = o.lastAlert;
    this.lastExec = o.lastExec;
    this.lastValue = o.lastValue;
    this.notifications = o.notifications;
    this.period = o.period;
    this.periodLabel = o.periodLabel;
    this.siteId = o.siteId;
    this.siteName = o.siteName;
    this.threshold = o.threshold;
    this.type = o.type;
    this.lastUpdate = o.lastUpdate;
    this.requestId = o.requestId;
    this.parentRequestId = o.parentRequestId;
    this.testMode = o.testMode;
    this.valuePeriod1 = o.valuePeriod1;
    this.valuePeriod2 = o.valuePeriod2;
  }

  isValid () {
    const invalid = (val) => val === '' || val === -1 || val == null;
    const nop = [this.userId, this.userName, this.label, this.metricId, this.metricName, this.period, this.periodLabel, this.siteId, this.siteName].findIndex(invalid);
    console.log(nop);
    return (nop === -1);
  }

  debug() {
    const invalid = (val) => val === '' || val === -1 || val == null;
    const nop = [this.userId, this.userName, this.label, this.metricId, this.metricName, this.period, this.periodLabel, this.siteId, this.siteName].findIndex(invalid);
    console.log([this.userId, this.userName, this.label, this.metricId, this.metricName, this.period, this.periodLabel, this.siteId, this.siteName][nop]);
    console.log(this);
  }
}

  /*
  'userId': number, 
  'id': string, -> généré par l'API 
  'userName': string 
  'currentState': string OK/KO  
  'direction': string up/down 
  'label': string, 
  'metricId': string, 
  'metricName': string, 
  'lastAlert': string  '2012-04-23T18:25:43.511Z', 
  'lastExec': string   '2012-04-23T18:25:43.511Z',  
  'lastValue': number,  
  'notifications': { 
    'ifttt': {}, 
    'mails': [ 
      'toto@xiti.com' 
    ], 
    'slack': {} 
  }, 
  'period': string   '{p1:{R:{H:'-1'}},p2:{R:{H:'0'}}}', 
  'periodLabel': string   'current hour', 
  'siteId': number 547656, 
  'siteName': string  'GEODE',  
  'threshold': number 15, 
  'type': string relative/absolute, 
  'lastUpdate': '2012-04-23T18:25:43.511Z'   
  'requestId': '', 
  'parentRequestId': '', 
  'testMode': true/false, 
  'valuePeriod1': '', 
  'valuePeriod2': '', 
  */