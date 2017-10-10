import React, { Component } from 'react';
import { Link } from 'react-router';
import { TextInput } from './FormComponents/TextInput.js';
import { List } from './FormComponents/List.js';
import _ from 'lodash';
import './AddKpi.css';
import immutable from 'dot-prop-immutable';

export class AddKpi extends Component {
  constructor(props) {
    super(props);
    let defaultState = {
      label: {
        value: '',
      },
      site: {
        value: '',
      },
      metric: {
        value: '',
      },
      period: {
        value: '',
      }
    };

    let state = this.props.restoredState || defaultState;
    this.state = state;
    this.submit = this.submit.bind(this);
  }

  handleFieldChange(name, value) {
    const newState = immutable.set(this.state, `${name}.value`, value);
    this.setState(newState);
  }

  formNotEmpty() {
    const isEmpty = (val) => val == null || val == '';
    return [this.state.label.value,
      this.state.site.value,
      this.state.metric.value,
      this.state.period.value].findIndex(isEmpty) === -1;
  }

  submit(event) {
    event.preventDefault();
    if(this.formNotEmpty()) {
      this.props.submitKpi({...this.state});
    } else {
      console.log("c'est vide");
    }
  }

  render() {
    const commonProps = {
      onChange: this.handleFieldChange.bind(this)
    };
    return (
      <div className="w-content">
        <div className="w-back-kpi">
          <Link to="/">
            <i className="icon-arrow-left" aria-hidden="true"></i>
            <span>Back</span>
          </Link>
        </div>
        <form className="w-kpi-form" onSubmit={this.submit}>
          <div>
            <TextInput name="label" label="Label" type="label" value={this.state.label.value} empty={this.state.label.value === ''} {... commonProps}/>
          </div>
          <div>
            <List name="site" label="Site" type="site" value={this.state.site.value} empty={this.state.site.value === ''} {... commonProps}/>
          </div>
          <div>
            <List name="metric" label="Metric" type="metric" value={this.state.metric.value} empty={this.state.metric.value === ''} {... commonProps}/>
          </div>
          <div>
            <List name="period" label="On" type="period" value={this.state.period.value} empty={this.state.period.value === ''} {... commonProps}/>
          </div>
          <div onClick={()=> this.formNotEmpty() && this.props.nextStep({...this.state})} className={'w-add-alert-link ' + (this.formNotEmpty() ? '' : 'w-add-alert-link-inactive')}>
            <i className="icon-plus"></i> <span>Add an alert</span>
          </div>
          <input type="submit" className="w-save-button" value="Save" />
        </form>
      </div>
    );
  }
}
