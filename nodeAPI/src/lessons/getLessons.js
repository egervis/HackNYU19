'use strict';
import {Lesson} from '../models/prototypes';
import {getLessonPictures} from './internal/fetchIDs';

/**
 * Gets lessons given a class id.
 * @param {Request} req  query: { classid: string }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @return {Promise} status: 200, 404, 500 & Lesson[]
 */
export const request = async (req, res, pool) => {
  try {
    // Get the lessons from class ids
    const query = {
      text: 'SELECT lessonids FROM classlessons WHERE classid = $1',
      values: [req.query.classid],
    };
    let result = await pool.query(query);
    const response = [];
    if (result.rows.length > 0) {
      const lessonids = lessons.rows.map(lesson => lesson.lessonid);
      for (let i = 0; i < lessonids.length; i++) {
        const query2 = {
          text: 'SELECT * FROM lessons WHERE lessonid = $1',
          values: [lessonids[i]],
        };
        result = await pool.query(query2);
        const lessonEntry = result.rows[0];
        const pictureids = getLessonPictures(pool, lessonids[i]);
        const lessonsPrototype = new Lesson(
          lessonEntry.lessonid,
          lessonEntry.lessonname,
          lessonEntry.lessondescription,
          pictureids,
          lessonEntry.instructorid,
        );
        response.push(lessonsPrototype);
      }
      res.status(200);
    } else {
      res.status(404);
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting lessons', error.stack);
    res.status(500).send({
      error: error.stack,
    });
  }
};
