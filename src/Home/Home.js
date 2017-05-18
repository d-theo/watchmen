import React, { Component } from 'react';
import axios from 'axios';
import {Add} from '../Add/Add.js';
import {AlertItem} from '../AlertItem/AlertItem.js';

export class Home extends Component {
  render() {
    return (
      <div></div>
    )
    /*
    axios.get("https://fnuhd0lu6a.execute-api.eu-west-1.amazonaws.com/dev/alerts")
      .then(response => {
        var alertItems = response.map(response, alert => (<AlertItem name={alert.name} />));
        return (
          <div>
            <div class="w-alert-list">
              <ul>
                {alertItems}
              </ul>
            </div>
            <Add />
          </div>
        );
      })
      .catch(e => console.error(e))*/
  }
}
