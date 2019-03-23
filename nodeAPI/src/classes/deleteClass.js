"use strict";
import {
  convertStringToArray,
  convertArrayToString
} from '../models/utilities';

/**
 * Deletes classes and all that relates to the class based on classid.
 * @param  {Request} req  query: { classid: string }
 * @param  {Response} res
 * @param  {postgres.Pool} pool
 * @return {Promise}  status: 200, 404, 500
 */
export const request = async (req, res, pool) => {
  try {
    let classID = req.query.classid;
    let query = {
      text: 'SELECT * FROM classes WHERE classid = $1',
      values: [classID]
    };
    let classToDelete = await pool.query(query);

    if (classToDelete.rows.length > 0) {
      let users = convertStringToArray(classToDelete.row[0].studentids);
      users.push(classToDelete.row[0].instructorID);
      for (let i = 0; i < users.length; i++) {
        let query2 = {
          text: 'SELECT userclasses FROM users WHERE userid = $1',
          values: [users[i]]
        };
        let userClasses = convertStringToArray(await pool.query(query2).row[0]);
        userClasses.splice(userClasses.indexOf(classID), 1);
        let updatedClasses = convertArrayToString(userClasses);
        query3 = {
          text: 'UPDATE users SET userclasses = $1 WHERE userid = $2',
          values: [updatedClasses, users[i]]
        };
        await pool.query(query3);
      }

      let lessons = convertStringToArray(classToDelete.row[0].lessonids);
      for (let i = 0; i < lessons.length; i++) {
        let query4 = {
          text: 'DELETE FROM lessons WHERE lessonid = $1',
          values: [lessons[i]]
        };
        await pool.query(query4);
      }

      query5 = {
        text: 'DELETE FROM events WHERE classID = $1',
        values: [classID]
      };
      await pool.query(query5);

      let query6 = {
        text: 'DELETE FROM feedback WHERE classid = $1',
        values: [classID]
      };
      await pool.query(query6);

      let query7 = {
        text: 'DELETE FROM classes WHERE classid = $1',
        values: [classID]
      };
      await pool.query(query7);
      res.status(200);
    } else {
      res.status(404);
    }
    res.send();
  } catch (error) {
    console.error('ERROR deleting class', error.stack);
    res.status(500).send({
      'error': error.stack
    });
  }
}