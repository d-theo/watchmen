import React, { Component } from 'react';
import { Link } from 'react-router';
import { TextInput } from './FormComponents/TextInput.js';

import './AddKpi.css';

export class AddKpi extends Component {
  render() {
    return (
      <div>
        <TextInput label="Name"/>
      </div>
    )
  }
}
