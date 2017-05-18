import React, { Component } from 'react';
import './ConfigHeader.css';

export class ConfigHeader extends Component {
  render() {
    return (
      <div className="w-config-header">
        <input className="w-config-alert-name" placeholder="Alert name" type="text" />
        <button className="w-config-save">Save</button>
      </div>
    )
  }
}

