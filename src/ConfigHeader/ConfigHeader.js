import React, { Component } from 'react';
import './ConfigHeader.css';

export class ConfigHeader extends Component {
  onChange(e){
    this.props.onChangeName(e.target.value);
  }
  render() {
    return (
      <div className="w-config-header">
        <input className="w-config-alert-name" onChange={(e) => this.onChange(e)} placeholder="Alert name" type="text" />
        <button onClick={() => this.props.onSave()} className="w-config-save">Save</button>
      </div>
    );
  }
}

