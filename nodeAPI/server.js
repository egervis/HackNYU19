"use strict";

// Import statements
import { endpoints } from './src/endpointMapper';
import express from 'express';
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

// Time endpoint
app.get('/time', async (req, res) => {
  await endpoints.time(req, res, pool);
});

app.get('/loging', async (req, res) => {
  
});

app.listen(port, () => console.log(`Node is now listening on 192.168.99.100:${port}`));
