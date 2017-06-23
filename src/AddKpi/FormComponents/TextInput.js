import React, {Component} from 'react';

import './TextInput.css';

export class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {empty: props.empty};

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.onChange(this.props.type, this.state.empty, this.props.value);
  }

  handleChange(event) {
    let newState;
    if(event.target.value !== '') {
      newState = false;
    } else {
      newState = true;
    }

    this.setState({empty: newState});

    this.props.onChange(this.props.type, newState, event.target.value);
  }

  render() {
    const isEmpty = this.state.empty;
    return (
      <div className="w-input-container">
        <h3 className={"w-input-label " + (isEmpty ? 'w-is-empty' : 'w-is-not-empty')}>{this.props.label}</h3>
        <input className="w-text-input" type="text" onChange={this.handleChange} placeholder="Enter text"/>
      </div>
    )
  }
}