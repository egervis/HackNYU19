"use strict";

/**
 * A user as represented in the database.
 */
export class User {
    /**
     * Creates a new User object
     * @param {string} userid       represents the id of the user
     * @param {number} usertype     represents the type of the user
     * @param {string} lastname     represents the last name of the user
     * @param {string} firstname    represents the first name of the user
     * @param {string} email        the email of the user in email format
     * @param {string[]} userclasses  a list of class ids
     * @param {string} userpassword   the users password
     * @param {string[]} eventids     a list of event ids
     */
    constructor(userid, usertype, lastname, firstname, email, userclasses, userpassword, eventids) {
        this.userid = userid;
        this.usertype = usertype;
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
        this.userclasses = userclasses;
        this.userpassword = userpassword;
        this.eventids = eventids;
    }
}

/**
 * A class as represented in the database.
 */
export class Class {
    /**
     * Creates a new Class object.
     * @param {string} classid        represents the id of the class
     * @param {string} classname      represents the name of the class
     * @param {string[]} lessonids    a list of lesson ids
     * @param {string[]} studentids   a list of student ids
     * @param {string} instructorid   the id of the instructor of this class
     */
    constructor(classid, classname, lessonids, studentids, instructorid) {
        this.classid = classid;
        this.classname = classname;
        this.lessonids = lessonids;
        this.studentids = studentids;
        this.instructorid = instructorid;
    }
}

/**
 * An event as represented in the database.
 */
export class ClassEvent {
    /**
     * Creates a new event object.
     * @param {string} eventid      the id of the event
     * @param {number} eventtype    the type of the event
     * @param {string} eventname    the name of the event
     * @param {Date} dateexpires    the expiration date of this event
     * @param {string} instructorid the id of the instructor of this event
     */
    constructor(eventid, eventtype, eventname, dateexpires, instructorid, classid) {
        this.eventids = eventid;
        this.eventtype = eventtype;
        this.eventname = eventname;
        this.dateexpires = dateexpires;
        this.instructorid = instructorid;
        this.classid = classid;
    }
}

/**
 * A lesson as represented in the database.
 */
export class Lesson {
    /**
     * Creates a new lesson object.
     * @param {string} lessonid          the id of the lesson
     * @param {string} lessonname        the name of the lesson
     * @param {string} lessondescription the description of the lesson
     * @param {string[]} pictureids      a list of pictureids
     * @param {string} instructorid      the id of the instructor
     */
    constructor(lessonid, lessonname, lessondescription, pictureids, instructorid) {
        this.lessonid = lessonid;
        this.lessonname = lessonname;
        this.lessondescription = lessondescription;
        this.pictureids = pictureids;
        this.instructorid = instructorid;
    }
}

/**
 * A picture as represented in the database.
 */
export class Picture {
    /**
     * Creates a new picture object.
     * @param {string} pictureid   the id of the picture
     * @param {string} picturename the name of the picture
     * @param {string} picturefile the name of the file of the picture
     */
    constructor(pictureid, picturename, picturefile) {
        this.pictureid = pictureid;
        this.picturename = picturename;
        this.picturefile = picturefile;
    }
}

/**
 * A feedback as represented in the database.
 */
export class Feedback {
    /**
     * Creates a new feedback object.
     * @param {string} feedbackid   the id of the feedback
     * @param {string} instructorid the id of the instructor
     * @param {string} studentid    the id of the student
     * @param {string} feedbackText the feedback content
     */
    constructor(feedbackid, instructorid, studentid, classid, feedbackText) {
        this.feedbackid = feedbackid;
        this.instructorid = instructorid;
        this.studentid = studentid;
        this.classid = classid;
        this.feedbackText = feedbackText;
    }
}