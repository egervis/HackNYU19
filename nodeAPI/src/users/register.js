"use strict";
import uniqid from 'uniqid';

// req.body: {
//   userType: number,
//   lastName: string,
//   firstName: string,
//   email: string,
//   userPassword: string
// }

// response:
//   N/A

// status:
//   201, 500
export const request = async (req, res, pool) => {
  try {
    // Get the user by email and password
    let query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [req.body.email]
    };
    let user = await pool.query(query);
    if (user.rows.length > 0) {
      throw new Error('User already exists!');
    }
    query = {
      text: 'INSERT INTO users (userID, userType, lastName, firstName, email, userClasses, userPassword, eventIDs) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [uniqid(), req.body.userType, req.body.lastName, req.body.firstName, req.body.email, '', req.body.userPassword, '']
    };
    await pool.query(query);
    res.status(201).send();
  } catch (error) {
    console.error('ERROR creating user', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
