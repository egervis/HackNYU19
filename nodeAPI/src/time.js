"use strict";

export const request = async (req, res, pool) => {
  try {
    let result = await pool.query('SELECT NOW()');
    res.status(200).send(JSON.stringify(result.rows[0]));
  } catch (error) {
    console.error('ERROR getting current time', error.stack);
    res.status(500).send({'error': error.stack});
  }
};
