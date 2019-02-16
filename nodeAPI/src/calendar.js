"use strict";
import { events } from './prototypes';

export const request = async (req, res, pool) => {
  try {
    // Get the user by their ID
    let userType = req.query.usertype;
    let events = req.query.eventids;
    let response;
    if (events) {
      res.status(200);

      let eventids = events.split(",");
      let array = [];
      foreach (id in eventids)
      {
        let query = {
          text: 'SELECT * FROM events WHERE eventid = $1',
          values: [id]
        };
        let eventEntry =  await pool.query(query);
        let currentEvents = eventEntry.rows[0];
        let eventsPrototype;
        if(userType == 0) {
          eventsPrototype = events(currentEvents.eventid, currentEvents.eventtype, currentEvents.eventname, currentEvents.dateexpires, '');
        } else {
          eventsPrototype = events(currentEvents.eventid, currentEvents.eventtype, currentEvents.eventname, currentEvents.dateexpires, currentEvents.instructorid);
        }
        array.push(eventsPrototype);
      }

      response = array;
    } else {
      res.status(404);
      response = {};
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting classes', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
