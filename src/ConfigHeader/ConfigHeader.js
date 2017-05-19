import React, { Component } from 'react';
import './ConfigHeader.css';

export class ConfigHeader extends Component {
  onChange(e){
    this.props.onChangeName(e.target.value);
  }
  render() {
    let disabled = this.props.validable ? false : 'disabled';
    let inactive = this.props.validable ? '' : 'inactive';
    return (
      <div className="w-config-header">
        <input className="w-config-alert-name" onChange={(e) => this.onChange(e)} placeholder="Alert name" type="text" />
        <button disabled={disabled}
          onClick={() => this.props.onSave()}
          className={`w-config-save ${inactive}`}>Save</button>
      </div>
    );
  }
}

