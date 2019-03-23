"use strict";

export const request = async (req, res, pool) => {
  try {
    let query = {
      text: 'SELECT * FROM events'
    };
    let events = await pool.query(query);
    if (events) {
      res.status(200);
      let eventRows = user.rows;//what's user?
      let array = [];
      for (let i=0; i<eventRows.length; i++)//(let row in eventRows)
      {
        currentEvent = events(eventRows[i].eventid, '', '', eventRows[i].dateexpires, '');//Event()?
        let mydate = new Date(currentEvent.dateexpires);
        let currentDate = new Date();
        let newDate = new Date(mydate.setTime( mydate.getTime() + 1 * 86400000 ));
        if(currentDate<newDate)
        {
          array.push(currentEvent)
        }
      }
      for (let i=0; i<array.length; i++)//(let date in array)
      {
        let eventID = array[i].eventid;
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
