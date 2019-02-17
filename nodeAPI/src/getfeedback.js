"use strict";
import { events } from './prototypes';

export const request = async (req, res, pool) => {
  try {
    // Get the user by their ID
    let userType = req.body.usertype;
    let user = req.body.userid;
    if(userType == 0)
    {
      let query = {
        text: 'SELECT * FROM feedback WHERE instructorid = $1',
        values: [user]
      };
    }
    else
    {
      let query = {
        text: 'SELECT * FROM feedback WHERE studentid = $1',
        values: [user]
      };
    }
    let feedback =  await pool.query(query);
    let response;
    if (feedback) {
      res.status(200);
      let feedbackRows = feedback.rows;

      let array = [];
      foreach (row in feedbackRows)
      {
        let feedbackPrototype;
        if(userType == 0) {
          feedbackPrototype = feedback(row.feedbackid, '', row.studentid, row.feedbackText);
        } else {
          feedbackPrototype = feedback(row.feedbackid, row.instructorid, '', row.feedbackText);
        }
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
    res.status(500).send({'error': error.stack});
  }
}
