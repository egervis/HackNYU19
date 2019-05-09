"use strict";

import * as createClass from './classes/createClass';
import * as deleteClass from './classes/deleteClass';
import * as getClasses from './classes/getClasses';
import * as getEvents from './events/getEvents';
import * as eventUpdate from './events/eventUpdate';
import * as createFeedback from './feedback/createFeedback';
import * as getFeedback from './feedback/getFeedback';
import * as createLesson from './lessons/createLesson';
import * as getLessons from './lessons/getLessons';
import * as getLesson from './lessons/getLesson';
import * as login from './users/login';
import * as register from './users/register';
import * as getUsers from './users/getUsers';

// Maps endpoints their respective functions
export const endpoints = {
  classes: {
    createClass: createClass.request,
    getClasses: getClasses.request,
    deleteClass: deleteClass.request
  },
  events: {
    eventUpdate: eventUpdate.request,
    getEvents: getEvents.request
  },
  feedback: {
    createFeedback: createFeedback,
    getFeedback: getFeedback
  },
  lessons: {
    createLesson: createLesson.request,
    getLesson: getLesson.request,
    getLessons: getLessons.request
  },
  users: {
    getUsers: getUsers.request,
    login: login.request,
    register: register.request
  }
};