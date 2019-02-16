"use strict";

export const request = async (req, res, pool) => {
  let result = await pool.query('SELECT NOW()');
  res.send(result);
};
