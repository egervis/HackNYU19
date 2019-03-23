"use strict";
import { User } from '../models/prototypes';
import { convertStringToArray } from '../models/utilities';

/**
 * Verifies the users credentials and logs them in.
 * @param {Request} req        body: { email: string, password:string }
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

    // Process
    let response = {};
    if (user.rows.length > 0) {
      res.status(200);
      const currentUser = user.rows[0];
      const currentUserClasses = convertStringToArray(currentUser.userclasses);
      const currentUserEvents = convertStringToArray(currentUser.eventids);
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
    } else {
      res.status(404);
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR logging in user', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
