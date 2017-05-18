import React, { Component } from 'react';
import { Slider } from '../shared/slider/Slider.js';
import './Then.css';

export class Then extends Component {
  constructor() {
    super();
  }  

  ifttt(event) {
    this.props.onUpdate({
      id: 'notif',
      data: {
        ifttt: event.active
      }
    });
  }
  mail(event) {
    this.props.onUpdate({
      id: 'notif',
      data: {
        mail: event.active
      }
    });
  }
  slack(event) {
    this.props.onUpdate({
      id: 'notif',
      data: {
        slack: event.active
      }
    });
  }
  render() {
    return (
      <div className="w-then">
        <div className="w-then-row">
          <Slider onSwitched={(e) => this.ifttt(e)}></Slider>
          <img src={'ifttt.png'} style={{height: 30}}/>
        </div>
        <div className="w-then-row">
          <Slider onSwitched={(e) => this.mail(e)}></Slider>
          <img src={'mail.png'} style={{height: 50}}/>  
        </div>
        <div className="w-then-row">
          <Slider onSwitched={(e) => this.slack(e)}></Slider>
          <img src={'slack.png'} style={{height: 50}}/>
        </div>
      </div>
    );
  }
}