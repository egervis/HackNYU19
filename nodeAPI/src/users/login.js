"use strict";
import {
  User
} from '../models/prototypes';
import {
  Error
} from '../models/internal/errors';
import {
  getUserClasses,
  getUserEvents
} from './internal/fetchIDs';

/**
 * Verifies the users credentials and logs them in.
 * @param {Request} req        body: { email: string, userPassword:string }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @return {Promise}  status: 200, 404, 500 & new User
 */
export const request = async (req, res, pool) => {
  try {
    // Setup
    let query = {
      text: 'SELECT * FROM users WHERE email = $1 AND userpassword = $2',
      values: [req.body.email, req.body.userPassword]
    };

    // Get
    let user = await pool.query(query);

    // Check validity
    if (user.rows.length == 0) {
      throw new Error(404, 'Failed to login: Incorrect email or password.');
    }

    // Process
    let response = {};
    const currentUser = user.rows[0];
    const currentUserClasses = await getUserClasses(pool, currentUser.userid);
    const currentUserEvents = await getUserEvents(pool, currentUser.userid);
    response = new User(
      currentUser.userid,
      currentUser.usertype,
      currentUser.lastname,
      currentUser.firstname,
      currentUser.email,
      currentUserClasses,
      currentUser.userpassword,
      currentUserEvents
    );
    res.status(200).send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR logging in user', error.stack);
    res.status(error.status || 500).send({
      error: error.stack
    });
  }
};