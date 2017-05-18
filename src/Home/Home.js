import React, { Component } from 'react';
import axios from 'axios';
import {Add} from '../Add/Add.js';
import {AlertItem} from '../AlertItem/AlertItem.js';
import {HomeTabItem} from '../HomeTabItem/HomeTabItem.js';
import './Home.css';


export class Home extends Component {

  constructor(){
    super();
    this.state = {
      'alertItems': [],
      'tabs': [{id:"ALL", text: "All alerts", active: true},{id:"ACTIVE", text: "Active alerts", active: false}]
    };
    axios.get("https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/alerts")
      .then(response => {
        console.log(response);
        this.setState({'alertItems': response.data })
      }).catch(e => {
        console.log(e)
        this.setState({'alertItems': [{"id":"9aeb9f07-d964-4904-a067-a35ddde1e8df","name":"MOCKMOCKMOCJK"},{"last-value":50,"user":{"name":"jpiquet@xiti.com","id":258945},"period":"R:{D:0}","site":{"name":"Hit-Parade","id":1},"name":"Alerte 1","state":"ok","value":100,"notifications":{"ifttt":[{}],"mails":["jpiquet@xiti.com"],"slack":[{}]},"direction":"up","description":"alerte alerte alerte !","id":"alerte1","last-value-date":"timestamp","metric":{"name":"Loads","id":"m_page_loads"},"type":"absolute"}] })
    })
  }

  setActive(tab){
    this.setState({'tabs': this.state.tabs.map(t => {
      t.active = (t.id === tab.id)
      return t
    })})
  }

  render() {
    var homeTabs = this.state.tabs.map(tab => (<HomeTabItem key={tab.id} tab={tab} tabClick={this.setActive.bind(this)}/>))
    var alertItems = this.state.alertItems.map(alert => (<AlertItem key={alert.id} name={alert.name} />));
    return (
      <div className="w-home-view">
        <div className="w-home-tabs">
          {homeTabs}
        </div>
        <div className="w-alert-list">
          {alertItems}
        </div>
        <Add />
      </div>
    )
  }
}
