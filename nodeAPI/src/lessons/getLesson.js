"use strict";
import { Lesson } from '../models/prototypes';

/**
 * Gets a lesson given the ID.
 * @param  req  query: { lessonid: string, usertype: number }
 * @param  res
 * @param  pool
 * @return {Promise}  status: 200, 404, 500 & new Lesson (students have omitted instructor id)
 */
export const request = async (req, res, pool) => {
  try {
    // Get the user by email and password
    let query = {
      text: 'SELECT * FROM lessons WHERE lessonid = $1',
      values: [req.query.lessonid]
    };
    let userType = req.query.usertype;
    let lesson = await pool.query(query);
    let response;
    if (lesson) {
      res.status(200);
      let currentLesson = user.rows[0];

      let lessonPrototype;
      if(userType == 0) {
        lessonPrototype = new Lesson(currentLesson.lessonid, currentLesson.lessonname, currentLesson.lessondescription, currentLesson.pictureids, '');
      } else {
        lessonPrototype = new Lesson(currentLesson.lessonid, currentLesson.lessonname, currentLesson.lessondescription, currentLesson.pictureids, currentLesson.instructorid);
      }
      let pictureids = lessonPrototype.pictureids.split(",");
      let array = [];
      array.push(lessonPrototype);
      for (let i=0; i<pictureids; i++)//(let id in pictureids)
      {
        let query2 = {
          text: 'SELECT * FROM pictures WHERE pictureid = $1',
          values: [pictureids[i]]
        };
        let pic = await pool.query(query2);
        let currentPic = user.rows[0];
        let picturePrototype = new pictures(currentPic.pictureid, currentPic.picturename, currentPic.picturefile, currentPic.lessonid);
        array.push(picturePrototype);
      }
      response = array;//first item in array will be lesson. all other items are pictures
    } else {
      res.status(404);
      response = {};
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting user', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
