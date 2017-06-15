import React, { Component } from 'react';
import { When } from '../When/When.js';
import { Is } from '../Is/Is.js';
import { Wit } from '../shared/wit/Wit.js';
import { Then } from '../Then/Then.js';
import { ConfigHeader } from '../ConfigHeader/ConfigHeader.js';
import './Configuration.css';
import axios from 'axios';
import { browserHistory } from 'react-router';

// pwa: icon
// paths qui chient
// rows qui se chevauchent

const alert = () => {
  return {
      "threshold":'',
      "user":{  
         "label":"jpiquet@xiti.com",
         "id":258945
      },
      "period":"R:{D:0}",
      "site":{  
         "label":"Hit-Parade",
         "id":1
      },
      "label":"",
      "notifications":{  
         "ifttt":{},
         "mails":[  
            "jpiquet@xiti.com"
         ],
         "slack":{}
      },
      "direction":"up",
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
    this.state = {
      when: false,
      is: false,
      then: false,
      isValid: false,
      evo: null
    };
  }

  evoCall() {
    let b = true;
    if (this.newAlert.type === 'smart') {
      b = true;
    }
    else if (isNaN(this.newAlert.threshold) || this.newAlert.threshold == '') {
      b = false;
    }
    if (b) {
      axios.post('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/alerts/check', this.newAlert).then((r)=> {
        console.log(r.data);
        this.setState({evo:r.data});
      });
    }
  }

  onToggle(event) {
    let newState = {
      When: false,
      Is: false,
      Then: false
    };
    newState[event.name] = event.open;
    this.setState(newState);
  }

  onChangeName(name) {
    this.newAlert.label = name;
    this.validateForm();
  }
  onSave() {
    axios.post('https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/alerts', this.newAlert).then((r)=> {
      browserHistory.push('/');
    });
  }
  onUpdate(e) {
    switch (e.id) {
      case 'site':
        this.newAlert.site.id = parseInt(e.data.id,10);
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
        if (e.data.threshold !== '') {
          this.newAlert.threshold = e.data.threshold;
          break;
        }
        this.newAlert.threshold = parseInt(e.data.threshold, 10);
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
    this.validateForm();
    this.evoCall();
  }

  validateForm() {
    let b = true;
    if (this.newAlert.type === 'smart') {
      b = true;
    }
    else if (isNaN(this.newAlert.threshold) || this.newAlert.threshold == '') {
      b = false;
    }
    if (this.newAlert.label == '') {
      b = false;
    }
    if (b !== this.state.isValid) {
      this.setState({isValid: b});
    }
  }

  render() {
    const renderComponentWhen = <When></When>;
    const renderComponentIs = <Is></Is>;
    const renderComponentThen = <Then></Then>;

    return (
      <div className="content">
        <ConfigHeader validable={this.state.isValid} onChangeName={(e) => this.onChangeName(e)} onSave={() => this.onSave()} />
        <div className="w-rows">
          <Wit toggle={(e) => this.onToggle(e)} open={this.state.When} onUpdate={(e) => this.onUpdate(e)} color="#39BBF9" name="When" renderComponent={renderComponentWhen}></Wit>
          <Wit evo={this.state.evo} toggle={(e) => this.onToggle(e)} open={this.state.Is} onUpdate={(e) => this.onUpdate(e)} color="#0CACf8" name="Is" renderComponent={renderComponentIs}></Wit>
          <Wit toggle={(e) => this.onToggle(e)} open={this.state.Then} onUpdate={(e) => this.onUpdate(e)} color="#0688C6" name="Then" renderComponent={renderComponentThen}></Wit>
        </div>
      </div>
    );
  }
}