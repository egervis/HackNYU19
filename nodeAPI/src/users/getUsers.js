"use strict";
import { User } from '../models/prototypes';

// request: {
//   userids: string[]
// }
//
// response:
//   User[] (all users will have omitted passwords and ids)
//
// status:
//   200, 404, 500

export const request = async (req, res, pool) => {
  try {
    let userArray = req.body.userids;
    for (let i=0; i<userArray.length; i++)
    {
      let query = {
        text: 'SELECT * FROM users WHERE userid = $1',
        values: [userArray[i]]
      };
      let currentUser =  await pool.query(query);
      let row = currentUser.rows[0];
      let userPrototype = new User('', row.usertype, row.lastname, row.firstname, row.email, row.userclasses, '', row.eventids);
      array.push(userPrototype);
    }

    let response;
    if (array.length > 0) {
      res.status(200);
      response = array;
    } else {
      res.status(404);
      response = [];
    }
    res.send(JSON.stringify(response));
  } catch (error) {
    console.error('ERROR getting users', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
