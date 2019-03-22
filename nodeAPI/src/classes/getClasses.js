"use strict";
import { Class } from '../models/prototypes';

/**
 * Gets classes based on userid.
 * @param  req  body: { userid: string }
 * @param  res
 * @param  pool
 * @return {Promise}  status: 200, 404, 500 & Class[]
 */
export const request = async (req, res, pool) => {
  try {
    let query = {
      text: 'SELECT userclasses FROM users WHERE userid = $1',
      values: [req.body.userid]
    };
    let classids = await pool.query(query);
    let response;
    if (classids.rows.length > 0) {
      res.status(200);
      let currentClasses = classids.rows[0].userclasses;
      let userclasses = currentClasses.split(',');
      let array = [];
      for (let i = 0; i < userclasses.length; i++)
      {
        query = {
          text: 'SELECT * FROM classes WHERE classid = $1',
          values: [userclasses[i]]
        };
        let classEntry =  await pool.query(query);
        classEntry = classEntry.rows[0];
<<<<<<< HEAD
        let classesPrototype;
        if(userType == 0) {
          classesPrototype = new classes(classEntry.classid, classEntry.classname, classEntry.lessonids.split(','), classEntry.studentids.split(','), '');
        } else {
          classesPrototype = new classes(classEntry.classid, classEntry.classname, classEntry.lessonids.split(','), '', classEntry.instructorid);
        }
=======

        let classesPrototype = new Class(classEntry.classid, classEntry.classname, classEntry.lessonids, classEntry.studentids, classEntry.instructorid);
>>>>>>> Cleanup-and-fix-backend
        array.push(classesPrototype);
      }
      response = array;
    } else {
      res.status(404);
      response = [];
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting classes', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
