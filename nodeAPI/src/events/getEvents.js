"use strict";

export const request = async (req, res, pool) => {
  let eventarr = [];
  try {
    // Get the events by user ID
    let query = {
      text: 'SELECT * FROM users WHERE userid = $1',
      values: [req.query.userID]//should be body?
    };
    let user = await pool.query(query);
    if (user.rows.length > 0) {
      user = user.rows[0];
      const eventids = user.eventids.split(',');
      const updatedIds = '';
      for (let i=0; i<eventids.length; i++)//(let eid in eventids)
      {
        query = {
          text: 'SELECT * FROM events WHERE eventid = $1',
          values: [eventids[i]]
        };
        let currEvent = await pool.query(query);
        if (currEvent.rows.length > 0) {
          updatedIds += `${eventids[i]},`;
          eventarr.push(currEvent.rows[0]);
        }
      }
      updatedIds = updatedIds.substring(0, updatedIds.length - 1);
      query = {
        text: 'UPDATE users SET eventids = $1 WHERE userid = $2',
        values: [updatedIds, req.query.userID]
      };
      await pool.query(query);
    } else {
      res.status(404);
      response = {};
    }
    res.send(JSON.stringify(eventarr));
  } catch (error) {
    console.error('ERROR getting events', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
