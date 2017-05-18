import React, { Component } from 'react';
import './HomeTabItem.css';

export class HomeTabItem extends Component {
  onclick(e){
    this.props.tabClick(this.props.tab)
  }
  render() {
    console.log(this.props.tab)
    var classes = `w-home-tab ${this.props.tab.active?'active':''}`;
    return (
      <a className={classes} onClick={e => this.onclick(e)}>
        {this.props.tab.text}
      </a>
    )
  }
}
