"use strict";
import { Lesson, Picture } from '../models/prototypes';
import { convertStringToArray } from '../models/utilities'

/**
 * Gets a lesson given the ID.
 * @param {Request} req  query: { lessonid: string }
 * @param {Response} res
 * @param {posgres.Pool} pool
 * @return {Promise}  status: 200, 404, 500 & { lesson: Lesson, pictures: Picture[] }
 */
export const request = async (req, res, pool) => {
  try {
    // Get the user by email and password
    let query = {
      text: 'SELECT * FROM lessons WHERE lessonid = $1',
      values: [req.query.lessonid]
    };
    let lesson = await pool.query(query);
    let response = {};
    if (lesson) {
      res.status(200);
      const currentLesson = user.rows[0];
      const pictureids = convertStringToArray(currentLesson.pictureids);
      const lessonPrototype = new Lesson(currentLesson.lessonid, currentLesson.lessonname, currentLesson.lessondescription, pictureids, currentLesson.instructorid);
      let picarray = [];
      for (let i=0; i<pictureids.length; i++)
      {
        let query2 = {
          text: 'SELECT * FROM pictures WHERE pictureid = $1',
          values: [pictureids[i]]
        };
        const result = await pool.query(query2);
        const currentPic = result.rows[0];
        const picturePrototype = new Picture(currentPic.pictureid, currentPic.picturename, currentPic.picturefile);
        picarray.push(picturePrototype);
      }
      response = { lesson: lessonPrototype, pictures: picarray};
    } else {
      res.status(404);
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting lesson', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
