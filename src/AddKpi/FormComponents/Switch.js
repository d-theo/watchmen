import React, {Component} from 'react';

import './Switch.css';
import './../AddKpi.css';

export class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {empty: props.empty, value: props.value};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.onChange(this.props.type, this.props.empty, 'off', 'off', 'checkbox');
  }

  handleChange(isActive) {
    return () => {
      const value = isActive;
      const newState = value === '' ? true : false;
      this.setState({empty: newState, value: value});
      this.props.onChange(this.props.type, this.props.empty, value, value, 'checkbox');
    };
  }

  render() {
    const id1 = this.props.label + "1";
    const id2 = this.props.label + "2";
    return (
      <div className="w-input-container">
        <h3 className='w-input-label w-is-not-empty'>{this.props.label}</h3>
        <div className="w-checkboxes">
        <div className="w-checkbox">
            <input onChange={this.handleChange(true)} type="radio" name={this.props.label} id={id1}/>
            <label htmlFor={id1}>
                ON
            </label>
        </div>

        <div>
            <input onChange={this.handleChange(false)} type="radio" name={this.props.label} id={id2} defaultChecked/>
            <label htmlFor={id2}>
                OFF
            </label>
        </div>
      </div>
      </div>
    )
  }
}