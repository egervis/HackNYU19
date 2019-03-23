"use strict";
import { User } from '../models/prototypes';

/**
 * Retrieves the users based on the given IDs.
 * @param {Request} req  body: { userids: string[] }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @return {Promise}  status: 200, 404, 500 & new User[] (omitted passwords)
 */
export const request = async (req, res, pool) => {
  try {
    // Setup
    let userArray = req.body.userids;
    let response = [];

    // Get all
    for (let i=0; i<userArray.length; i++) {
      let query = {
        text: 'SELECT * FROM users WHERE userid = $1',
        values: [userArray[i]]
      };
      let currentUser =  await pool.query(query);
      let user = currentUser.rows[0];
      let userPrototype = new User(user.userid, user.usertype, user.lastname, user.firstname, user.email, user.userclasses, '', user.eventids);
      response.push(userPrototype);
    }

    // Determine status code
    if (response.length > 0) {
      res.status(200);
    } else {
      res.status(404);
    }

    // Send response body
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting users', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
