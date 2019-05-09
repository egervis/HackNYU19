"use strict";
import uniqid from 'uniqid';

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
    const lessonID = uniqid();
    let picids = [];
    // Insert all picture entries into the database.
    for (let i = 0; i < pictures.length; i++) {
      let pictureID = uniqid();
      let query = {
        text: 'INSERT INTO pictures(pictureID, pictureName, pictureFile) VALUES($1, $2, $3)',
        values: [pictureID, pictures[i].pictureName, pictures[i].pictureFile]
      };
      await pool.query(query);
      picids.push(pictureID);

      query = {
        text: 'INSERT INTO lessonpictures(lessonID, pictureID) VALUES($1, $2)',
        values: [lessonID, pictureID]
      };
    }

    // Insert lesson into the database.
    let query = {
      text: 'INSERT INTO lessons(lessonId, lessonName, lessonDescription, instructorID) VALUES($1, $2, $3, $4)',
      values: [lessonID, req.body.lessonName, req.body.lessonDescription, req.body.instructorID]
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