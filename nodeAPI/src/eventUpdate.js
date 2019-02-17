"use strict";
import { events } from 'prototypes';

export const request = async (req, res, pool) => {
  try {
    // Get the user by email and password
    let query = {
      text: 'SELECT * FROM events'
    };
    let events = await pool.query(query);
    if (events) {
      res.status(200);
      let eventRows = user.rows;
      let array = [];
      for (let row in eventRows)
      {
        currentEvent = events(row.eventid, '', '', row.dateexpires, '');
        let mydate = new Date(currentEvent.dateexpires);
        let currentDate = new Date();
        let newDate = new Date(mydate.setTime( mydate.getTime() + 1 * 86400000 ));
        if(currentDate<newDate)
        {
          array.push(currentEvent)
        }
      }
      for (let date in array)
      {
        let eventID = date.eventid;
        let query2 = {
          text: 'DELETE FROM events WHERE eventid = $1',
          values: [eventID]
        };
        await pool.query(query2);
      }
    } else {
      res.status(404);
      response = {};
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting user', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
