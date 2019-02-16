"use strict";

export const request = async (req, res, pool) => {
  try {
    // Get the user by email and password
    let user = await pool.query();
    if (user) {
      res.status(200);
    } else {
      res.status(404);
    }
    res.send(JSON.stringify(user));
  } catch (error) {
    console.error('ERROR getting current time', error.stack);
    res.status(500).send({'error': error.stack});
  }
}
