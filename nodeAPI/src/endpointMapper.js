"use strict";

import * as time from './time';
import * as login from './login';
import * as register from './register';
import * as createClass from './createClass';
import * as getClasses from './getClasses';
import * as getLessons from './getLessons';

// Maps endpoints their respective functions
export const endpoints = {
  time: time.request,
  login: login.request,
  register: register.request,
  createClass: createClass.request,
  getClasses: getClasses.request,
  getLessons: getLessons.request
};
