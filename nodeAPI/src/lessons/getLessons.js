"use strict";
import { Lesson } from '../models/prototypes';

export const request = async (req, res, pool) => {
  try {
    // Get the lessons from class ids
    let query = {
      text: 'SELECT lessonids FROM classes WHERE classid = $1',
      values: [req.query.classid]
    };
    let userType = req.query.usertype;
    let lessons = await pool.query(query);
    let response;
    if (lessons) {
      res.status(200);
      let currentLessons = lessons.rows[0].lessonids;
      let lessonids = currentLessons.split(",");
      let array = [];
      for (let i=0; i<lessonids.length; i++)//(let id in lessonids)
      {
        let query2 = {
          text: 'SELECT * FROM lessons WHERE lessonid = $1',
          values: [lessonids[i]]
        };
        let lessonEntry =  await pool.query(query2);
        let lessonsPrototype;
        if(userType == 0) {
          lessonsPrototype = new Lesson(lessonEntry.lessonid, lessonEntry.lessonname, lessonEntry.lessondescription, lessonEntry.pictureids, '');
        } else {
          lessonsPrototype = new Lesson(lessonEntry.lessonid, lessonEntry.lessonname, lessonEntry.lessondescription, lessonEntry.pictureids, lessonEntry.instructorid);
        }
        array.push(lessonsPrototype);
      }

      response = array;
    } else {
      res.status(404);
      response = {};
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting lessons', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
