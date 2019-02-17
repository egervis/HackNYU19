"use strict";

// Import statements
import { endpoints } from './src/endpointMapper';
import express from 'express';
import postgres from 'pg';
import cors from 'cors';
const bodyParser = require('body-parser');

const app = express();
const port = 3001;
const Pool = postgres.Pool
const pool = new Pool({
  user: 'postgres',
  host: '192.168.99.100',
  password: 'admin',
  port: '5432',
  database: 'postgres'
});

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next)=>{
  console.log(`${req.method}: ${req.path}`);
  console.log(req.body);
  next();
});

// Time endpoint
app.get('/time', async (req, res) => {
  await endpoints.time(req, res, pool);
});

// Login endpoint
app.post('/login', async (req, res) => {
  await endpoints.login(req, res, pool);
});

// Register endpoint
app.post('/register', async (req, res) => {
  await endpoints.register(req, res, pool);
});

// Create class endpoint
app.post('/class/create', async (req, res) => {
  await endpoints.createClass(req, res, pool);
});

// Get classes endpoint
app.get('/class/get', async (req, res) => {
  await endpoints.getClasses(req, res, pool);
});

app.listen(port, () => console.log(`Node is now listening on 192.168.99.100:${port}`));
