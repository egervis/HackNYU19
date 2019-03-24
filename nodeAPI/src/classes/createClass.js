"use strict";
import uniqid from 'uniqid';

/**
 * Creates a class instance in the database.
 * @param {Request} req  body: { className: string, instructorID: string }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @return {Promise}  status: 200, 404, 500 & { classCode: string }
 */
export const request = async (req, res, pool) => {
  try {
    if (classes.rows.length > 0) {
      const classID = uniqid();
      let query = {
        text: 'INSERT INTO classes (classID, className, instructorID) VALUES($1, $2, $3)',
        values: [classID, req.body.className, req.body.instructorID]
      };
      await pool.query(query);

      query = {
        text: 'INSERT INTO userclasses (userID, classID) VALUES($1, $2)',
        values: [req.body.instructorID, classID]
      };
      await pool.query(query);

      res.status(200).send(JSON.stringify({
        classCode: classID
      }));
    } else {
      res.status(404);
    }
  } catch (error) {
    console.error('ERROR creating class', error.stack);
    res.status(500).send({
      'error': error.stack
    });
  }
};