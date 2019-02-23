"use strict";
import { lessons } from '../models/prototypes';

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
        lessonPrototype = new lessons(currentLesson.lessonid, currentLesson.lessonname, currentLesson.lessondescription, currentLesson.pictureids.split(','), '');
      } else {
        lessonPrototype = new lessons(currentLesson.lessonid, currentLesson.lessonname, currentLesson.lessondescription, currentLesson.pictureids.split(','), currentLesson.instructorid);
      }
      let pictureids = lessonPrototype.pictureids;
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
        let picturePrototype = new pictures(currentPic.pictureid, currentPic.picturename, currentPic.picturefile);
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
