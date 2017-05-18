import React, { Component } from 'react';
import { When } from '../When/When.js';
import { Is } from '../Is/Is.js';
import { Wit } from '../shared/wit/Wit.js';
import { ConfigHeader } from '../ConfigHeader/ConfigHeader.js';
import './Configuration.css';

export class Configuration extends Component {
  constructor() {
    super();
    this.state = {
      newAlert: {
        site: 410501,
        metric: "visits",
        period: "current_day",
        name: "",
        strategy: {
          type: "variation_up",
          value: -1
        },
        notifs: []
      }
    };
  }

  onChangeName() {
    // maj current name
  }
  onSave() {
    // validate && send
  }
  onUpdate(e) {
    console.log(e);
    // object.assign ?
  }

  render() {
    const renderComponentWhen = <When></When>;
    const renderComponentIs = <Is></Is>;
    const renderComponentThen = <div></div>;

    return (
      <div className="content">
        <ConfigHeader />
        <div className="w-rows">
          <Wit onUpdate={(e) => this.onUpdate(e)} color="#0ABFBC" name="When" renderComponent={renderComponentWhen}></Wit>
          <Wit onUpdate={(e) => this.onUpdate(e)} color="#13747D" name="Is" renderComponent={renderComponentIs}></Wit>
          <Wit onUpdate={(e) => this.onUpdate(e)} color="#FC354C" name="Then" renderComponent={renderComponentThen}></Wit>
        </div>
      </div>
    );
  }
}