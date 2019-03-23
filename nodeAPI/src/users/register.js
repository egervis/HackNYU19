"use strict";
import uuid from 'uuid/v1';

/**
 * Creates a new user in the database.
 * @param {Request} req        body: { userType: number, lastName: string, firstName: string, email: string, userPassword: string }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @return {Promise}  status: 201, 500 & no return content
 */
export const request = async (req, res, pool) => {
  try {
    // Get the user by email and password
    let query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [req.body.email]
    };
    let user = await pool.query(query);

    // Validate email uniqueness
    if (user.rows.length > 0) {
      throw new Error('User already exists!');
    }

    // Create new user in the database
    const userID = uuid()
    query = {
      text: 'INSERT INTO users (userID, userType, lastName, firstName, email, userClasses, userPassword, eventIDs) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [userID, req.body.userType, req.body.lastName, req.body.firstName, req.body.email, '', req.body.userPassword, '']
    };
    await pool.query(query);
    res.status(201).send();
  } catch (error) {
    console.error('ERROR creating user', error.stack);
    res.status(500).send({
      'error': error.stack
    });
  }
}