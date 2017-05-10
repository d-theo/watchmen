import React, { Component } from 'react';
import './Wit.css';

export class Wit extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
        };
    }
    onClick() {
        this.setState({open: !this.state.open});
    }
    render() {
        return (
            <div className="wit">
                <WitHeader open={this.state.open} onClick={() => this.onClick()} name={this.props.name}></WitHeader>
                <WitBody renderComponent={this.props.renderComponent} open={this.state.open}></WitBody>
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
        return (
            <div className={`wit-body ${mode}`}>
                {this.props.renderComponent}
            </div>
        );
    }
}