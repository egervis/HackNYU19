"use strict";
import {
  ClassEvent
} from '../models/prototypes';
import {
  deleteEvents
} from './internal/delete'
/**
 * Deletes events that are past expiration dates.
 * @param {Request} req
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @returns {Promise} status: 200, 404, 500
 */
export const request = async (req, res, pool) => {
  try {
    let query = {
      text: 'SELECT * FROM events'
    };
    let events = await pool.query(query);
    if (events.rows.length > 0) {
      res.status(200);
      let eventRows = events.rows;
      let array = [];
      for (let i = 0; i < eventRows.length; i++) {
        currentEvent = ClassEvent(eventRows[i].eventid, '', '', eventRows[i].dateexpires, '');
        let mydate = new Date(currentEvent.dateexpires);
        let currentDate = new Date();
        let newDate = new Date(mydate.setTime(mydate.getTime() + 1 * 86400000));
        if (currentDate < newDate) {
          array.push(currentEvent);
        }
      }
      await deleteEvents(pool, array);
    } else {
      res.status(404);
      response = {};
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting user', error.stack);
    res.status(500).send({
      'error': error.stack
    });
  }
}