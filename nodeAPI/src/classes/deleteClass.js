"use strict";
import {
  deleteLessons
} from '../lessons/internal/delete';
import {
  deleteEvents
} from '../events/internal/delete';
import {
  getClassLessons,
  getClassStudents
} from './internal/fetchIDs';

/**
 * Deletes classes and all that relates to the class based on classid.
 * @param  {Request} req  query: { classid: string }
 * @param  {Response} res
 * @param  {postgres.Pool} pool
 * @return {Promise}  status: 200, 404, 500
 */
export const request = async (req, res, pool) => {
  try {
    const classID = req.query.classid;
    let query = {
      text: 'SELECT * FROM classes WHERE classid = $1',
      values: [classID]
    };
    let response = await pool.query(query);

    if (response.rows.length > 0) {
      const classToDelete = response.rows[0];
      const userIDs = await getClassStudents(pool, classID);
      userIDs.push(classToDelete.instructorID);
      const lessonIDs = await getClassLessons(pool, classID);

      // Delete lesson association with this class
      query = {
        text: 'DELETE FROM classlessons WHERE classid = $1',
        values: [classID]
      };
      await pool.query(query);
      await deleteLessons(pool, lessonIDs);

      // Delete student association with this class
      query = {
        text: 'DELETE FROM classstudents WHERE classid = $1',
        values: [classID]
      };
      await pool.query(query);

      // Delete user association with this class
      query = {
        text: 'DELETE FROM userclasses WHERE classid = $1',
        values: [classID]
      }
      await pool.query(query);

      // Delete events that are associated with this class
      query = {
        text: 'SELECT eventid FROM events WHERE classid = $1',
        values: [classID]
      };
      response = await pool.query(query);
      const eventids = response.rows.map(entry => entry.eventid);
      await deleteEvents(pool, eventids);

      // Delete feedback that is associated with this class
      query = {
        text: 'DELETE FROM feedback WHERE classid = $1',
        values: [classID]
      };
      await pool.query(query);

      // Delete the class entry in the database
      query = {
        text: 'DELETE FROM classes WHERE classid = $1',
        values: [classID]
      };
      await pool.query(query);

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