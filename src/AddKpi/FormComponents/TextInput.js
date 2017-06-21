import React, {Component} from 'react';

import './TextInput.css';

export class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {empty: true};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if(event.target.value !== '') {
      this.setState({empty: false});
    } else {
      this.setState({empty: true});
    }
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