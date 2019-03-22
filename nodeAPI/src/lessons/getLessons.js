"use strict";
import { Lesson } from '../models/prototypes';
import { convertStringToArray } from '../models/utilities'

/**
 * Gets lessons given a class id.
 * @param  req  query: { classid: string }
 * @param  res
 * @param  pool
 * @return {Promise} status: 200, 404, 500
 */
export const request = async (req, res, pool) => {
  try {
    // Get the lessons from class ids
    let query = {
      text: 'SELECT lessonids FROM classes WHERE classid = $1',
      values: [req.query.classid]
    };
    let lessons = await pool.query(query);
    let response = {};
    if (lessons) {
      res.status(200);
      let lessonids = convertStringToArray(lessons.rows[0].lessonids);
      let array = [];
      for (let i=0; i<lessonids.length; i++)
      {
        const query2 = {
          text: 'SELECT * FROM lessons WHERE lessonid = $1',
          values: [lessonids[i]]
        };
<<<<<<< HEAD
        let lessonEntry =  await pool.query(query2);
        let lessonsPrototype;
        if(userType == 0) {
          lessonsPrototype = new lessons(lessonEntry.lessonid, lessonEntry.lessonname, lessonEntry.lessondescription, lessonEntry.pictureids.split(','), '');
        } else {
          lessonsPrototype = new lessons(lessonEntry.lessonid, lessonEntry.lessonname, lessonEntry.lessondescription, lessonEntry.pictureids.split(','), lessonEntry.instructorid);
        }
=======
        const lessonEntry =  await pool.query(query2);
        const lessonsPrototype = new Lesson(lessonEntry.lessonid, lessonEntry.lessonname, lessonEntry.lessondescription, lessonEntry.pictureids, lessonEntry.instructorid);
>>>>>>> Cleanup-and-fix-backend
        array.push(lessonsPrototype);
      }
      response = array;
    } else {
      res.status(404);
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting lessons', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
