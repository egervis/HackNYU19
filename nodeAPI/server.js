"use strict";

// Import statements
import { endpoints } from './src/endpointMapper';
import express from 'express';
import express-session from 'express-session';
import postgres from 'pg';

const app = express();
const port = 3000;
const Pool = postgres.Pool
const pool = new Pool({
  user: 'postgres',
  host: '192.168.99.100',
  password: 'admin',
  port: '5432',
  database: 'postgres'
});
//session
app.use(session({secret: 'ssshhhhh'}));
var sess;

// Time endpoint
app.get('/time', async (req, res) => {
  await endpoints.time(req, res, pool);
});

// Login endpoint
app.get('/login', async (req, res) => {
  await endpoints.login(req, res, pool, sess);
  //sess=req.session;
  //sess.userid = req.query.userid;
});

app.listen(port, () => console.log(`Node is now listening on 192.168.99.100:${port}`));
