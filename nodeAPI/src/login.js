"use strict";

export const request = async (req, res, pool) => {
  try {
    // Get the user by email and password
    let query = {
      text: 'SELECT * FROM users WHERE email = $1 AND userPassword = $2',
      values: [req.params.email, req.params.userPassword]
    };
    let user = await pool.query(query).rows[0];
    if (user) {
      res.status(200);
    } else {
      res.status(404);
    }
    res.send(JSON.stringify(user));
  } catch (error) {
    console.error('ERROR getting current time', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
