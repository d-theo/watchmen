import React, { Component } from 'react';
import './ConfigHeader.css';

export class ConfigHeader extends Component {
  render() {
    return (
      <div className="w-config-header">
        <button className="w-config-save">Save</button>
        <input className="w-config-name" placeholder="Alert name" type="text" />
      </div>
    )
  }
}

