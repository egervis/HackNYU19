"use strict";
import uuid from 'uuid/v1';
import {
  convertArrayToString
} from '../models/utilities';

/**
 * Creates a new lesson instance in the database.
 * @param {Request} req  body: {
 *                      allPictures: {name: string, file: string},
 *                      lessonName: string,
 *                      lessonDescription: string,
 *                      instructorID: string
 *                    }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @return {Promise}  status: 201, 500
 */
export const request = async (req, res, pool) => {
  try {
    const pictures = req.body.allPictures;
    let picids = [];
    // Insert all picture entries into the database.
    for (let i = 0; i < pictures.length; i++) {
      let pictureID = uuid();
      let query = {
        text: 'INSERT INTO pictures(pictureID, pictureName, pictureFile) VALUES($1, $2, $3)',
        values: [pictureID, pictures[i].pictureName, pictures[i].pictureFile]
      };
      await pool.query(query);
      picids.push(pictureID);
    }

    // Insert lesson into the database.
    const lessonId = uuid();
    let query = {
      text: 'INSERT INTO lessons(lessonId, lessonName, lessonDescription, pictureIds, instructorID) VALUES($1, $2, $3, $4, $5)',
      values: [lessonId, req.body.lessonName, req.body.lessonDescription, convertArrayToString(picids), req.body.instructorID]
    };
    await pool.query(query);
    res.status(201);
  } catch (error) {
    console.error('ERROR creating lesson', error.stack);
    res.status(500).send({
      'error': error.stack
    });
  }
};