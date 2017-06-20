import React, {Component} from 'react';

import './TextInput.css';

export class TextInput extends Component {
  render() {
    return (
      <div className="w-input-container">
        <h3 className="w-input-label">{this.props.label}</h3>
        <input className="w-text-input" type="text" placeholder="Enter text"/>
      </div>
    )
  }
}