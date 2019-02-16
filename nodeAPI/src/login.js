"use strict";

export const request = async (req, res, pool) => {
  try {
    let result = await pool.query();
    if (result) {
      res.status(200);
    } else {
      res.status(404);
    }
    res.send(JSON.stringify(result));
  } catch (error) {
    console.error('ERROR getting current time', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
