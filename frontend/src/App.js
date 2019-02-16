import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import TeacherHome from './TeacherHome.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render
    return (
      <div>
          <Switch location={isModal ? this.previousLocation : location}>
            <Route exact path="/" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/teacher/home" component={TeacherHome} />
          </Switch>
      </div>
    );
  }
}

export default App;
