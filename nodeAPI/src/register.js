"use strict";
import { users } from 'prototypes';

export const request = async (req, res, pool) => {
  try {
    // Get the user by email and password
    let query = {
      text: 'SELECT * FROM users WHERE email = $1 AND userPassword = $2',
      values: [req.query.email, req.query.userPassword]
    };
    let user = await pool.query(query);

  } catch (error) {
    console.error('ERROR creating user', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
