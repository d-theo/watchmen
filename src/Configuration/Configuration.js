import React, { Component } from 'react';
import { When } from '../When/When.js';
import { Is } from '../Is/Is.js';
import { Wit } from '../shared/wit/Wit.js';
import { Then } from '../Then/Then.js';
import { ConfigHeader } from '../ConfigHeader/ConfigHeader.js';
import './Configuration.css';
import axios from 'axios';

// threshold : int
// direct <->type

const alert = () => {
  return {
      "threshold":100,
      "user":{  
         "label":"jpiquet@xiti.com",
         "id":258945
      },
      "period":"R:{D:0}",
      "site":{  
         "label":"Hit-Parade",
         "id":1
      },
      "label":"Alerte 1",
      "notifications":{  
         "ifttt":{},
         "mails":[  
            "jpiquet@xiti.com"
         ],
         "slack":{}
      },
      "direction":"up",
      "lastValue":50,
      "description":"alerte alerte alerte !",
      "metric":{  
         "label":"Loads",
         "id":"m_page_loads"
      },
      "type":"relative"
   }
}

export class Configuration extends Component {
  constructor() {
    super();
    this.newAlert = alert();
  }

  onChangeName(name) {
    this.newAlert.label = name;
  }
  onSave() {
    axios.post('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/alerts', this.newAlert).then((r)=> {
      console.log(r);
    });
    console.log("on save");
    console.log(this.newAlert);

  }
  onUpdate(e) {
    switch (e.id) {
      case 'site':
        this.newAlert.site.id = e.data.id;
        this.newAlert.site.label = e.data.label;
        break;
      case 'metric':
        this.newAlert.metric.id = e.data.id;
        this.newAlert.metric.label = e.data.label;
        break;
      case 'period':
        this.newAlert.period = e.data.id;
        break;
      case 'threshold':
        this.newAlert.threshold = e.data.threshold;  
        break;
      case 'type':
        this.newAlert.direction = e.data.direction;
        this.newAlert.type = e.data.type;
        break;
      case 'notif':
        if (e.data.slack !== undefined) {
          e.data.slack ? this.newAlert.notifications.slack = {} : delete this.newAlert.notifications.slack;
        }
        else if (e.data.ifttt !== undefined){
          e.data.ifttt ? this.newAlert.notifications.ifttt = {} : delete this.newAlert.notifications.ifttt;
        } else if (e.data.mails !== undefined) {
          e.data.mails ? this.newAlert.notifications.mails = ["jpiquet@xiti.com"] : delete this.newAlert.notifications.mails;
        }
        break;
      default:
        console.log("default");
        break;
    }
  }

  render() {
    const renderComponentWhen = <When></When>;
    const renderComponentIs = <Is></Is>;
    const renderComponentThen = <Then></Then>;

    return (
      <div className="content">
        <ConfigHeader onChangeName={(e) => this.onChangeName(e)} onSave={() => this.onSave()} />
        <div className="w-rows">
          <Wit onUpdate={(e) => this.onUpdate(e)} color="#0ABFBC" name="When" renderComponent={renderComponentWhen}></Wit>
          <Wit onUpdate={(e) => this.onUpdate(e)} color="#13747D" name="Is" renderComponent={renderComponentIs}></Wit>
          <Wit onUpdate={(e) => this.onUpdate(e)} color="#FC354C" name="Then" renderComponent={renderComponentThen}></Wit>
        </div>
      </div>
    );
  }
}