"use strict";

// A user as represented in the database.
export class User {
    // userid: string (represents the id of the user)
    // usertype: number (represents the type of the user) (0 - instructor, 1 - student)
    // lastname: string (represents the last name of the user)
    // firstname: string (represents the first name of the user)
    // email: string (the email of the user formatted at ___@___.___)
    // userclasses: string[] (a list of class ids)
    // eventids: string[] (a list of event ids)
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

// A class as represented in the database.
export class Class {
    // classid: string (represents the id of the class)
    // classname: string (represents the name of the class)
    // lessonids: string[] (a list of lesson ids)
    // studentids: string[] (a list of student ids)
    // instructorid: string (the id of the instructor of this class)
    constructor(classid, classname, lessonids, studentids, instructorid) {
        this.classid = classid;
        this.classname = classname;
        this.lessonids = lessonids;
        this.studentids = studentids;
        this.instructorid = instructorid;
    }
}

// An event as represented in the database.
export class Event {
    // eventid: string (the id of the event)
    // eventtype: string (the type of the event ##Needs clarification##)
    // eventname: string (the name of the event)
    // dateexpires: string (the expiration date of this event ##Clarify formatting of this type##)
    // instructorid: string (the id of the instructor of this event)
    constructor(eventid, eventtype, eventname, dateexpires, instructorid) {
        this.eventids = eventid;
        this.eventtype = eventtype;
        this.eventname = eventname;
        this.dateexpires = dateexpires;
        this.instructorid = instructorid;
    }
}

// A lesson as represented in the database.
export class Lesson {
    // lessonid: string (the id of the lesson)
    // lessonname: string (the name of the lesson)
    // lessondescription: string (the description of the lesson)
    // pictureids: string[] (a list of pictureids)
    // instructorid: string (the id of the instructor)
    constructor(lessonid, lessonname, lessondescription, pictureids, instructorid) {
        this.lessonid = lessonid;
        this.lessonname = lessonname;
        this.lessondescription = lessondescription;
        this.pictureids = pictureids;
        this.instructorid = instructorid;
    }
}

// A picture as represented in the database.
export class Picture {
    // pictureid: string (the id of the picture)
    // picturename: string (the name of the picture)
    // picturefile: string (the name of the file of the picture)
    // lessonid: string (the id of the lesson ##This should be removed, as it's tightly coupling lesson and picture##)
    constructor(pictureid, picturename, picturefile, lessonid) {
        this.pictureid = pictureid;
        this.picturename = picturename;
        this.lessonid = lessonid;
        this.picturefile = picturefile;
    }
}

// A feedback as represented in the database.
export class Feedback {
    // feedbackid: string (the id of the feedback)
    // instructorid: string (the id of the instructor)
    // studentid: string (the id of the student)
    // feedbackText: string (the feedback content)
    constructor(feedbackid, instructorid, studentid, feedbackText) {
        this.feedbackid = feedbackid;
        this.instructorid = instructorid;
        this.studentid = studentid;
        this.feedbackText = feedbackText;
    }
}
