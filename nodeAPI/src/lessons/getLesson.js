'use strict';
import {Lesson, Picture} from '../models/prototypes';
import {getLessonPictures} from './internal/fetchIDs';

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
    const query = {
      text: 'SELECT * FROM lessons WHERE lessonid = $1',
      values: [req.query.lessonid],
    };
    const result = await pool.query(query);
    let response = {};
    if (result.rows.length > 0) {
      const currentLesson = result.rows[0];
      const pictureids = getLessonPictures(pool, currentLesson.lessonid);
      const lessonPrototype = new Lesson(
        currentLesson.lessonid,
        currentLesson.lessonname,
        currentLesson.lessondescription,
        pictureids,
        currentLesson.instructorid,
      );
      const picarray = [];
      for (let i = 0; i < pictureids.length; i++) {
        const query2 = {
          text: 'SELECT * FROM pictures WHERE pictureid = $1',
          values: [pictureids[i]],
        };
        const result = await pool.query(query2);
        const currentPic = result.rows[0];
        const picturePrototype = new Picture(
          currentPic.pictureid,
          currentPic.picturename,
          currentPic.picturefile,
        );
        picarray.push(picturePrototype);
      }
      response = {
        lesson: lessonPrototype,
        pictures: picarray,
      };
      res.status(200);
    } else {
      res.status(404);
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting lesson', error.stack);
    res.status(500).send({
      error: error.stack,
    });
  }
};
