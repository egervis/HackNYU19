import './App.css';

import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';

import Login from './Login';
import Registration from './Registration';
import Dashboard from './dashboard';
import TeacherCalendar from './teacher/calendar.js';
import StudentClass from './student/classes.js';
import TeacherFeedback from './teacher/feedback.js';

const App = props => {
  const handleInvalidURL = () =>
    localStorage.getItem('userid') === null ? (
      <Redirect to="/login" />
    ) : (
      <Redirect to="/dashboard" />
    );
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/registration" component={Registration} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/teacher/calendar" component={TeacherCalendar} />
      <Route path="/student/classes" component={StudentClass} />
      <Route path="/teacher/feedback" component={TeacherFeedback} />
      <Route path="*" render={handleInvalidURL} />
    </Switch>
  );
};

export default App;
