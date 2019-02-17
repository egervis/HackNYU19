"use strict";
import uniqid from 'uniqid';

export const request = async (req, res, pool) => {
  try {
    const classId = uniqid();
    let query = {
      text:'INSERT INTO classes (classID, className, lessonids, studentIDs, instructorID) VALUES($1, $2, $3, $4, $5)' ,
      values: [classId, req.body.className, '', '', req.body.instructorID]
    };
    await pool.query(query);
    res.status(200).send(JSON.stringify({
      classCode: classId
    }));
  } catch (error) {
    console.error('ERROR creating class', error.stack);
    res.status(500).send({'error': error.stack});
  }
};
