"use strict";

export const request = (req, res, pool) => {
  try {
    let query 
  } catch (error) {
    console.error('ERROR creating class', error.stack);
    res.status(500).send({'error': error.stack});
  }
};
