import React, { Component } from 'react';
import { When } from '../When/When.js';
import { Is } from '../Is/Is.js';
import { Wit } from '../shared/wit/Wit.js';
import { ConfigHeader } from '../ConfigHeader/ConfigHeader.js';
import './Configuration.css';

export class Configuration extends Component {
  render() {
    const renderComponentWhen = <When></When>;
    const renderComponentIs = <Is></Is>;
    const renderComponentThen = <div></div>;
    return (
      <div>
        <ConfigHeader />
        <Wit color="#FC354C" name="When" renderComponent={renderComponentWhen}></Wit>
        <Wit color="#13747D" name="Is" renderComponent={renderComponentIs}></Wit>
        <Wit color="#0ABFBC" name="Then" renderComponent={renderComponentThen}></Wit>
      </div>
    );
  }
}