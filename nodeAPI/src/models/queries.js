"use strict";
import { User } from '../models/prototypes';

/**
 * The query methods used by all endpoints.
 */

 /**
  * Returns a User object based on a given userID.
  * @param  {string} userid The comma separated list string.
  * @return {User} A User Object.
  */
export const getUsersByUserID = (userid) => {
  let query = {
    text: 'SELECT * FROM users WHERE userid = $1',
    values: [userid]
  };
  let user = await pool.query(query).rows[0];
  userObject = new User(user.userid, user.usertype, user.lastname, user.firstname, user.email, user.userpassword);
  return userObject;
};

/**
 * Returns an array of User objects based on a given classID.
 * @param  {string} classid The comma separated list string.
 * @return {Array<User>} A User Object.
 */
export const getUsersByClassID = (classid) => {
 let query = {
   text: 'SELECT * FROM users INNER JOIN users ON classstudents.classid = $1',
   values: [classid]
 };
 let users = await pool.query(query).rows;
 let userObjects = [];
 for(let i=0; i<users.length; i++)
 {
   let user = users[i];
   userObjects.push(new User(user.userid, user.usertype, user.lastname, user.firstname, user.email, user.userpassword));
 }
 return userObjects;
};
