import React, {Component} from 'react';

import './List.css';

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {empty: true};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if(event.target.value !== 'empty') {
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
        <select className="w-list-input" onChange={this.handleChange}>
          <option value="empty">Choose one</option>
          <option value="m_visits">Visits</option>
          <option value="m_visits">Visits</option>
          <option value="m_visits">Visits</option>
          <option value="m_visits">Visits</option>
        </select>
      </div>
    )
  }
}