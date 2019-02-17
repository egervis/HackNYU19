"use strict";

import * as time from './time';
import * as login from './login';
import * as register from './register';
import * as createClass from './createClass';
import * as createFeedback from './createFeedback'
import * as createLesson from './createLesson'
import * as getClasses from './getClasses';
import * as getLessons from './getLessons';
import * as getLesson from './getLesson';
import * as getFeedback from './getFeedback';

// Maps endpoints their respective functions
export const endpoints = {
  time: time.request,
  login: login.request,
  register: register.request,
  createClass: createClass.request,
  createFeedback: createFeedback.request,
  createLesson: createLesson.request,
  getClasses: getClasses.request,
  getLessons: getLessons.request,
  getLesson: getLesson.request,
  getFeedback: getFeedback.request
};
