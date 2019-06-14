'use strict';
import {Feedback} from '../models/prototypes';

/**
 * Gets feedback given user id.
 * @param {Request} req query: { userid: string }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @returns {Promise} status: 200, 404, 500 & Feedback[]
 */
export const request = async (req, res, pool) => {
  try {
    // Get the user by their ID
    const userType = req.query.usertype;
    const user = req.query.userid;
    let query;
    if (userType == 0) {
      query = {
        text: 'SELECT * FROM feedback WHERE instructorid = $1',
        values: [user],
      };
    } else {
      query = {
        text: 'SELECT * FROM feedback WHERE studentid = $1',
        values: [user],
      };
    }
    const feedback = await pool.query(query);
    let response;
    if (feedback.rows.length > 0) {
      res.status(200);
      const feedbackRows = feedback.rows;

      const array = [];
      for (let i = 0; i < feedbackRows.length; i++) {
        const feedbackPrototype = new Feedback(
          feedbackRows[i].feedbackid,
          feedbackRows[i].instructorid,
          feedbackRows[i].studentid,
          feedbackRows[i].classid,
          feedbackRows[i].feedbackText,
        );
        array.push(feedbackPrototype);
      }

      response = array;
    } else {
      res.status(404);
      response = {};
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting classes', error.stack);
    res.status(500).send({
      error: error.stack,
    });
  }
};
