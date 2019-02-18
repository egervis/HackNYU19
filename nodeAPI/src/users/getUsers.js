"use strict";
import { users } from '../models/prototypes';

export const request = async (req, res, pool) => {
  // TODO Redo this code
  try {
    let user = req.query.userids;
    let userArray = user.split(',');
    let array = [];
    for (let i=0; i<userArray.length; i++)//(let str in userArray)
    {
      let query = {
        text: 'SELECT * FROM users WHERE userid = $1',
        values: [userArray[i]]
      };
      let currentUser =  await pool.query(query);
      let row = currentUser.rows[0];
      let userPrototype = new users(row.userid, row.usertype, row.lastname, row.firstname, row.email, row.userclasses, '', row.eventids);
      array.push(userPrototype);
    }

    let response;
    if (array.length > 0) {
      res.status(200);
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
