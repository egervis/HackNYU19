'use strict';
import uniqid from 'uniqid';
import {Error} from '../models/internal/errors';

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
      values: [req.body.email],
    };
    const user = await pool.query(query);

    // Validate email uniqueness
    if (user.rows.length > 0) {
      throw new Error(400, 'Cannot register: Email Taken.');
    }

    // Validate correct usertype data
    if (req.body.userType != 0 && req.body.userType != 1) {
      throw new Error(400, 'Cannot register: Invalid user type.');
    }

    // Create new user in the database
    const userID = uniqid();
    query = {
      text:
        'INSERT INTO users (userID, userType, lastName, firstName, email, userPassword) VALUES($1, $2, $3, $4, $5, $6)',
      values: [
        userID,
        req.body.userType,
        req.body.lastName,
        req.body.firstName,
        req.body.email,
        req.body.userPassword,
      ],
    };
    await pool.query(query);
    res.status(201).send();
  } catch (error) {
    console.error('ERROR creating user', error.stack);
    res.status(error.status || 500).send({
      error: error.stack,
    });
  }
};
