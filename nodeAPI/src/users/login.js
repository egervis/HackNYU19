"use strict";
import { User } from '../models/prototypes';

// req.body: {
//   email: string,
//   password: string
// }

// response:
//   new User(id, type, last, first, email, [], '', [])

// status:
//   200, 404, 500
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
      let currentUser = user.rows[0];
      response = new User(currentUser.userid, currentUser.usertype, currentUser.lastname, currentUser.firstname, currentUser.email, [], '', []);
    } else {
      res.status(404);
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR logging in user', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
