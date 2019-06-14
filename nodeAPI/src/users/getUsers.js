'use strict';
import {User} from '../models/prototypes';
import {Error} from '../models/internal/errors';
import {getUserClasses, getUserEvents} from './internal/fetchIDs';

/**
 * Retrieves the users based on the given IDs.
 * @param {Request} req  query: { userids: string[] }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @return {Promise}  status: 200, 204, 500 & new User[] (omitted passwords)
 */
export const request = async (req, res, pool) => {
  try {
    // Setup
    const userArray = JSON.parse(req.query.userids);
    const response = [];

    // Get all
    for (let i = 0; i < userArray.length; i++) {
      const query = {
        text: 'SELECT * FROM users WHERE userid = $1',
        values: [userArray[i]],
      };
      const result = await pool.query(query);
      const currentuser = result.rows[0];

      const userClasses = await getUserClasses(pool, userArray[i]);
      const userEvents = await getUserEvents(pool, userArray[i]);
      const userPrototype = new User(
        currentuser.userid,
        currentuser.usertype,
        currentuser.lastname,
        currentuser.firstname,
        currentuser.email,
        userClasses,
        '',
        userEvents,
      );
      response.push(userPrototype);
    }

    // Determine status code
    if (response.length > 0) {
      res.status(200);
    } else {
      res.status(204);
    }

    // Send response body
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting users', error.stack);
    res.status(error.status || 500).send({
      error: error.stack,
    });
  }
};
