"use strict";
import uuid from 'uuid/v1';

/**
 * Creates a feedback.
 * @param {Request} req body: { feedbackID: string, instructorID: string, studentID: string, feedbackText: string }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @returns {Promise} status: 201, 500
 */
export const request = async (req, res, pool) => {
  try {
    const feedbackId = uuid();
    let query = {
      text: 'INSERT INTO feedback(feedbackid, instructorid, studentid, feedbacktext) VALUES($1, $2, $3, $4, $5)',
      values: [feedbackId, req.body.instructorID, req.body.studentID, req.body.classID, req.body.feedbackText]
    };
    await pool.query(query);
    res.status(201);
  } catch (error) {
    console.error('ERROR creating class', error.stack);
    res.status(500).send({
      'error': error.stack
    });
  }
};