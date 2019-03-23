"use strict";
import {
  User
} from '../models/prototypes';
import {
  getUserClasses,
  getUserEvents
} from './internal/fetchIDs';

/**
 * Retrieves the users based on the given IDs.
 * @param {Request} req  query: { userids: string[] }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @return {Promise}  status: 200, 404, 500 & new User[] (omitted passwords)
 */
export const request = async (req, res, pool) => {
  try {
    // Setup
    let userArray = req.query.userids;
    let response = [];

    // Get all
    for (let i = 0; i < userArray.length; i++) {
      const query = {
        text: 'SELECT * FROM users WHERE userid = $1',
        values: [userArray[i]]
      };
      const result = await pool.query(query);
      const currentuser = result.rows[0];

      const userClasses = await getUserClasses(pool, userArray[i]);
      const userEvents = await getUserEvents(pool, userArray[i]);
      const userPrototype = new User(currentuser.userid, currentuser.usertype, currentuser.lastname, currentuser.firstname, currentuser.email, userClasses, '', userEvents);
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
    res.status(500).send({
      'error': error.stack
    });
  }
}