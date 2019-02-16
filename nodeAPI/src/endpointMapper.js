"use strict";

import * as time from './time';
import * as login from './login';
import * as register from './register';

// Maps endpoints their respective functions
export const endpoints = {
  time: time.request,
  login: login.request,
  register: register.request
};
