"use strict";

/**
 * Gets classes based on userid.
 * @param  req  body: { classid: string }
 * @param  res
 * @param  pool
 * @return {Promise}  status: 200, 404, 500 & Class[]
 */
export const request = async (req, res, pool) => {
  try {
    let classID = req.body.classid;
    let query = {
      text: 'SELECT * FROM classes WHERE classid = $1',
      values: [classID]
    };
    let classToDelete = await pool.query(query);

    let response;
    if (classToDelete) {
      res.status(200);

      let users = classToDelete.row[0].studentids.split(",");
      users.push(classToDelete.row[0].instructorID);
      for(let i=0; i<users.length; i++)
      {
        let query2 = {
          text: 'SELECT userclasses FROM users WHERE userid = $1',
          values: [users[i]]
        };
        let userClasses = await pool.query(query2).row[0].split(",");
        userClasses.splice( userClasses.indexOf(classID), 1 );
        let updatedClasses = "";
        for(let j=0; j<userClasses.length; j++)
        {
          updatedClasses+=userClasses[j];
          updatedClasses+=",";
        }
        updatedClasses.slice(0, -1);
        query3 = {
          text: 'UPDATE users SET userclasses = $1 WHERE userid = $2',
          values: [updatedClasses, users[i]]
        };
        await pool.query(query3);
      }

      let lessons = classToDelete.row[0].lessonids.split(",");
      for(let i=0; i<lessons.length; i++)
      {
        let query4 = {
          text: 'DELETE FROM lessons WHERE lessonid = $1',
          values: [lessons[i]]
        };
        await pool.query(query4);
      }

      query5 = {
        text: 'DELETE FROM events WHERE classID = $1',
        values: [classID]
      };
      await pool.query(query5);

      let query6 = {
        text: 'DELETE FROM feedback WHERE classid = $1',
        values: [classID]
      };
      await pool.query(query6);

      let query7 = {
        text: 'DELETE FROM classes WHERE classid = $1',
        values: [classID]
      };
      await pool.query(query7);
    }
    } else {
      res.status(404);
    }
    res.send();
  } catch (error) {
    console.error('ERROR deleting class', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
