import React, {Component} from 'react';

import './TextInput.css';

export class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {empty: props.empty, value: props.value};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //this.props.onChange(this.props.type, this.state.empty, this.props.value);
  }

  handleChange(event) {
    const value = event.target.value;
    const newState = value === '' ? true : false;
    this.setState({empty: newState, value: value});
    this.props.onChange(this.props.type, newState, value, value, 'text');
  }

  render() {
    const isEmpty = this.state.empty;
    let type = {type: 'text'};
    if (this.props.inputType === 'number') {
      type = {
        pattern:'[0-9]*',
        inputMode:'numeric',
        type: 'number'
      };
    }

    return (
      <div className="w-input-container">
        <h3 className={"w-input-label " + (isEmpty ? 'w-is-empty' : 'w-is-not-empty')}>{this.props.label}</h3>
        <input className="w-text-input" defaultValue={this.props.value} {...type} onChange={this.handleChange} placeholder="Enter text"/>
      </div>
    )
  }
}