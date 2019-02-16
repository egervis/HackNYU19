"use strict";

export function users(userid, usertype, lastname, firstname, email, userclasses, userpassword, eventids)
{
  this.userid = userid;
  this.usertype = usertype;
  this.lastname = lastname;
  this.firstname = firstname;
  this.email = email;
  this.userclasses = userclasses;
  this.userpassword = userpassword;
  this.eventids = eventids;
}

export function classes(classid, classname, lessonids, studentids, instructorid)
{
  this.classid = classid;
  this.classname = classname;
  this.lessonids = lessonids;
  this.studentids = studentids;
  this.instructorid = instructorid;
}

export function events(eventid, eventtype, eventname, dateexpires, instructorid)
{
  this.eventids = eventid;
  this.eventtype = eventtype;
  this.eventname = eventname;
  this.dateexpires = dateexpires;
  this.instructorid = instructorid;
}

export function lessons(lessonid, lessonname, lessondescription, pictureids, instructorid)
{
  this.lessonid = lessonid;
  this.lessonname = lessonname;
  this.lessondescription = lessondescription;
  this.pictureids = pictureids;
  this.instructorid = instructorid;
}

export function pictures(pictureid, picturename, picturefile, lessonid)
{
  this.pictureid = pictureid;
  this.picturename = picturename;
  this.lessonid = lessonid;
  this.picturefile = picturefile;
}
