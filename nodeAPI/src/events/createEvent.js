'use strict';
import uniqid from 'uniqid';

/**
 * Creates a class instance in the database.
 * @param {Request} req  body: { className: string, instructorID: string }
 * @param {Response} res
 * @param {postgres.Pool} pool
 * @return {Promise}  status: 200, 404, 500 & { classCode: string }
 */
export const request = async (req, res, pool) => {
  try {
    const eventId = uniqid();
    const query = {
      text:
        'INSERT INTO events (eventID, eventType, eventName, dateExpires, instructorID, classID) VALUES($1, $2, $3, $4, $5, $6)',
      values: [
        eventId,
        req.body.eventType,
        req.body.eventName,
        req.body.dateExpires,
        req.body.instructorID,
        req.body.classID,
      ],
    };
    await pool.query(query);

    const query2 = {
      text: 'SELECT * FROM userclasses WHERE classid = $1',
      values: [classid],
    };
    const users = await pool.query(query2).rows;
    const userIDs = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      userIDs.push(user.userid);
    }

    for (let i = 0; i < userIDs.length; i++) {
      const query3 = {
        text: 'INSERT INTO usersevents (userID ,eventID) VALUES($1, $2)',
        values: [userIDs[i], eventId],
      };
    }
    await pool.query(query3);

    res.status(200).send();
  } catch (error) {
    console.error('ERROR creating event', error.stack);
    res.status(500).send({error: error.stack});
  }
};
