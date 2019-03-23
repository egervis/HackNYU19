"use strict";
import uuid from 'uuid/v1';

/**
 * Creates a class instance in the database.
 * @param {Request} req  body: { className: string, instructorID: string }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @return {Promise}  status: 200, 404, 500 & { classCode: string }
 */
export const request = async (req, res, pool) => {
  try {
    let query = {
      text: 'SELECT userclasses FROM users WHERE userid = $1',
      values: [req.body.instructorID]
    };
    let classes = await pool.query(query);
    if (classes.rows.length > 0) {
      const classId = uuid();
      query = {
        text: 'INSERT INTO classes (classID, className, lessonids, studentIDs, instructorID) VALUES($1, $2, $3, $4, $5)',
        values: [classId, req.body.className, '', '', req.body.instructorID]
      };
      await pool.query(query);

      const updatedclasses = `${classes.rows[0].userclasses}${classes.rows[0].userclasses === '' ? '' : ',' }${classId}`;
      query = {
        text: 'UPDATE users SET userclasses = $1 WHERE userid = $2',
        values: [updatedclasses, req.body.instructorID]
      };
      await pool.query(query);

      res.status(200).send(JSON.stringify({
        classCode: classId
      }));
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.error('ERROR creating class', error.stack);
    res.status(500).send({
      'error': error.stack
    });
  }
};