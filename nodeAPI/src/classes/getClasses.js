'use strict';
import {Class} from '../models/prototypes';
import {getUserClasses} from '../users/internal/fetchIDs';
import {getClassLessons, getClassStudents} from './internal/fetchIDs';

/**
 * Gets classes based on userid.
 * @param {Request} req  query: { userid: string }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @return {Promise}  status: 200, 404, 500 & Class[]
 */
export const request = async (req, res, pool) => {
  try {
    // Get class ids
    const classids = await getUserClasses(pool, req.query.userid);
    const response = [];
    if (classids.length > 0) {
      // Get classes
      for (let i = 0; i < classids.length; i++) {
        const query = {
          text: 'SELECT * FROM classes WHERE classid = $1',
          values: [classids[i]],
        };
        const result = await pool.query(query);
        const classEntry = result.rows[0];
        // Get lesson ids and student ids
        const lessons = await getClassLessons(pool, classids[i]);
        const students = await getClassStudents(pool, classids[i]);
        // Push new class to response array
        const classesPrototype = new Class(
          classEntry.classid,
          classEntry.classname,
          lessons,
          students,
          classEntry.instructorid,
        );
        response.push(classesPrototype);
      }

      // Status OK
      res.status(200);
    } else {
      // Not found
      res.status(404);
    }

    // Send response
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting classes', error.stack);
    res.status(500).send({
      error: error.stack,
    });
  }
};
