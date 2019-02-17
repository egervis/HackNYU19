"use strict";
import { classes } from './prototypes';

export const request = async (req, res, pool) => {
  try {
    // Get the user by their ID
    let query = {
      text: 'SELECT userclasses FROM users WHERE userid = $1',
      values: [req.query.userid]
    };
    let userType = req.query.usertype;
    let classes = await pool.query(query);
    let response;
    if (classes.rows.length > 0) {
      res.status(200);
      let currentClasses = classes.rows[0].userclasses;
      let classids = currentClasses.split(",");
      let array = [];
      for (id in classids)
      {
        let query2 = {
          text: 'SELECT * FROM classes WHERE classid = $1',
          values: [id]
        };
        let classEntry =  await pool.query(query2);
        let classesPrototype;
        if(userType == 0) {
          classesPrototype = classes(classEntry.classid, classEntry.classname, classEntry.lessonids, classEntry.studentids, '');
        } else {
          classesPrototype = classes(classEntry.classid, classEntry.classname, classEntry.lessonids, '', classEntry.instructorid);
        }
        array.push(classesPrototype);
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
