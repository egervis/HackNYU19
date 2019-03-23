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
export const getUsersByID = (userid) => {
  let query = {
    text: 'SELECT * FROM users WHERE userid = $1',
    values: [userid]
  };
  let user = await pool.query(query).rows[0];
  userObjects = new User(user.userid, user.usertype, user.lastname, user.firstname, user.email, user.userpassword);
  return userObjects;
};
