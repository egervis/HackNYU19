'use strict';
import {ClassEvent} from '../models/prototypes';

/**
 * Gets a list of events given a user id.
 * @param {Request} req query: { userID: string }
 * @param {Response} res
 * @param {postgres.Pool} pool
 */
export const request = async (req, res, pool) => {
  try {
    // Get the events by user ID
    const query = {
      text: 'SELECT * FROM usersevents WHERE userid = $1',
      values: [req.query.userID],
    };
    const events = await pool.query(query).rows;
    const eventarr = [];
    if (events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        const currEvent = events[i];
        const query2 = {
          text: 'SELECT * FROM events WHERE eventid = $1',
          values: [currEvent],
        };
        const e = await pool.query(query2).rows[0];
        eventarr.push(
          new ClassEvent(
            e.eventid,
            e.eventtype,
            e.eventname,
            e.dateexpires,
            e.dateexpires,
            e.instructorid,
          ),
        );
      }
    } else {
      res.status(404);
    }
    res.send(JSON.stringify(eventarr));
  } catch (error) {
    console.error('ERROR getting events', error.stack);
    res.status(500).send({error: error.stack});
  }
};
