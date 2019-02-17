"use strict";
import { events } from './prototypes';

export const request = async (req, res, pool) => {
  try {
    // Get the events by user ID
    let query = {
      text: 'SELECT * FROM users WHERE userid = $1',
      values: [req.query.userID]
    };
    let user = await pool.query(query);
    if (user.rows.length > 0) {
      const eventids = user.eventids.split(',');
      foreach ( in )
    } else {
      res.status(404);
      response = {};
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting events', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
