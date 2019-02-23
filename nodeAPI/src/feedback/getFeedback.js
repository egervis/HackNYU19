"use strict";
import { Feedback } from '../models/prototypes';

export const request = async (req, res, pool) => {
  try {
    // Get the user by their ID
    let userType = req.query.usertype;
    let user = req.query.userid;
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
    if (feedback.rows.length > 0) {
      res.status(200);
      let feedbackRows = feedback.rows;

      let array = [];
      for (let i=0; i<feedbackRows.length; i++)//(let row in feedbackRows)
      {
        let feedbackPrototype;
        if(userType == 0) {
          feedbackPrototype = new Feedback(feedbackRows[i].feedbackid, '', feedbackRows[i].studentid, feedbackRows[i].feedbackText);
        } else {
          feedbackPrototype = new Feedback(feedbackRows[i].feedbackid, feedbackRows[i].instructorid, '', feedbackRows[i].feedbackText);
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
