"use strict";
import { users } from './prototypes';

export const request = async (req, res, pool) => {
  try {
    // Get the user by email and password
    let query = {
      text: 'SELECT * FROM users WHERE email = $1 AND userPassword = $2',
      values: [req.body.email, req.body.userPassword]
    };
    let user = await pool.query(query);
    let response;
    if (user.rows.length > 0) {
      res.status(200);
      let currentUser = user.rows[0];
      let userPrototype = users(currentUser.userid, currentUser.usertype, currentUser.lastname, currentUser.firstname, currentUser.email, '', '', '');
      response = userPrototype;
    } else {
      res.status(404);
      response = {};
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting user', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
