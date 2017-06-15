import React, { Component } from 'react';
import './Wit.css';

export class Wit extends Component {
  onClick() {
    this.props.toggle({
      name: this.props.name,
      open: !this.props.open
    });
  }

  render() {
    return (
      <div style={{backgroundColor : this.props.color}} className="wit">
        <WitHeader open={this.props.open} onClick={() => this.onClick()} name={this.props.name}></WitHeader>
        <WitBody evo={this.props.evo} onUpdate={this.props.onUpdate} renderComponent={this.props.renderComponent} open={this.props.open}></WitBody>
      </div>
    );
  }
}

export class WitHeader extends Component {
  render() {
    const mode = this.props.open ? '' : 'close';
    return (
        <div className="wit-header" onClick={ () => this.props.onClick()}>
            <span className={`wit-header-arrow ${mode}`}> <i className="fa fa-angle-down fa-3x"/> </span>
            <span className="wit-header-title">{this.props.name}</span>
        </div>
    );
  }
}

export class WitBody extends Component {
  render() {
    let mode = this.props.open ? '' : 'hide';
    console.log("evo#->"+this.props.evo);
    let layout = React.cloneElement(this.props.renderComponent, {onUpdate: this.props.onUpdate, evo:this.props.evo});
    return (
      <div className={`wit-body ${mode}`}>
        {layout}
      </div>
    );
  }
}