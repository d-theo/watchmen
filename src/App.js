import React, { Component, cloneElement, createElement } from 'react';
import { Router, browserHistory, Route, Link, IndexRoute } from 'react-router';
import {Wit} from './shared/wit/Wit';
import logo from './logo.svg';
import {WatchSelect} from './shared/select/WatchSelect';
import { slideRight } from './preset.js';
import './App.css';
import TransitionMotion from 'react-motion/lib/TransitionMotion';
import PropTypes from 'prop-types';
import spring from 'react-motion/lib/spring';

function ensureSpring(styles) {
  return Object.keys(styles).reduce(
    (acc, key) => {
      const value = styles[key];
      acc[key] = typeof value === 'number' ? spring(value) : value;
      return acc;
    },
    {},
  );
}
const RouteTransitionDemo = (props) => (
  <div>
    {props.route.childRoutes.map((childRoute, index) => {
      const to = ['', props.route.path, childRoute.path].join('/');
      return (
        <Link className="link" key={to} to={to}>
          another {props.route.path}
        </Link>
      );
    })}
    <RouteTransition
      component={false}
      className="transition-wrapper"
      pathname={props.location.pathname}
      {...props.preset}
    >
      {props.children}
    </RouteTransition>
  </div>
);

class RouteTransition extends Component {
  constructor(props) {
    super(props);
    this.renderRoute = this.renderRoute.bind(this);
    this.renderRoutes = this.renderRoutes.bind(this);
    this.willEnter = this.willEnter.bind(this);
    this.willLeave = this.willLeave.bind(this);
  }

  getDefaultStyles() {
    if (!this.props.runOnMount) {
      return null;
    }

    if (!this.props.children) {
      return [];
    }

    return [
      {
        key: this.props.pathname,
        data: this.props.children,
        style: this.props.atEnter,
      },
    ];
  }

  // there's only ever one route mounted at a time,
  // so just return the current match
  getStyles() {
    if (!this.props.children) {
      return [];
    }

    // TODO: maybe access route path from children for pathname?
    return [
      {
        key: this.props.pathname,
        data: this.props.children,
        style: ensureSpring(this.props.atActive),
      },
    ];
  }

  willEnter() {
    return this.props.atEnter;
  }

  willLeave() {
    return ensureSpring(this.props.atLeave);
  }

  renderRoute(config) {
    const props = {
      style: this.props.mapStyles(config.style),
      key: config.key,
    };

    return this.props.component
      ? createElement(this.props.component, props, config.data)
      : cloneElement(config.data, props);
  }

  renderRoutes(interpolatedStyles) {
    return (
      <div className={this.props.className} style={this.props.style}>
        {interpolatedStyles.map(this.renderRoute)}
      </div>
    );
  }

  render() {
    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {this.renderRoutes}
      </TransitionMotion>
    );
  }
}

RouteTransition.defaultProps = {
  component: 'div',
  runOnMount: true,
  mapStyles: val => val,
};

RouteTransition.propTypes = {
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  pathname: PropTypes.string.isRequired,
  atEnter: PropTypes.object.isRequired,
  atActive: PropTypes.object.isRequired,
  atLeave: PropTypes.object.isRequired,
  mapStyles: PropTypes.func,
  runOnMount: PropTypes.bool,
  style: PropTypes.object,
};

const Page = ({ title }) => (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{title}</h2>
      </div>
      <p className="App-intro">
        This is the {title} page.
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/about">About</Link>
      </p>
      <p>
        <Link to="/settings">Settings</Link>
      </p>
    </div>
)


class Home extends Component {
  render() {
    const bodyComponent = <WatchSelect values={['test', 'test2']}></WatchSelect>;
    return (
      <Wit name="When" renderComponent={bodyComponent}></Wit>
    );
  }
} 

const About = (props) => (
  <Page title="About"/>
)

const Settings = (props) => (
  <Page title="Settings"/>
)

const SlideRightDemo = props => (
  <RouteTransitionDemo preset={slideRight} {...props} />
);

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
          <Route path="fade" component={SlideRightDemo}>
          <IndexRoute component={Home} />
        </Route>
        <Route path="/about" component={About}/>
        <Route path="/settings" component={Settings}/>
      </Router>
    );
  }
}

export default App;
