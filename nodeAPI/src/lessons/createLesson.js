"use strict";
import uniqid from 'uniqid';

export const request = async (req, res, pool) => {
  try {
    let pictures = req.body.allPictures;
    let str = ""
    for (let i=0; i<pictures.length; i++)//(let pic in pictures)
    {
      let pictureID = uniqid();
      let query = {
        text:'INSERT INTO pictures(pictureID, pictureName, lessonId, pictureFile) VALUES($1, $2, $3, $4)' ,
        values: [pictureID, pictures[i].pictureName, req.body.lessonID, pictures[i].pictureFile]
      };
      str+=(pictureID+",");
    }
    str = str.substring(0, str.length - 1);
    const lessonId = uniqid();
    let query = {
      text:'INSERT INTO lessons(lessonId, lessonName, lessonDescription, pictureIds, instructorID) VALUES($1, $2, $3, $4, $5)' ,
      values: [lessonId, req.body.lessonName, req.body.lessonDescription, str, req.body.instructorID]
    };
    await pool.query(query);
    res.status(200).send(JSON.stringify({
      lessonCode: lessonsId
    }));
  } catch (error) {
    console.error('ERROR creating class', error.stack);
    res.status(500).send({'error': error.stack});
  }
};
