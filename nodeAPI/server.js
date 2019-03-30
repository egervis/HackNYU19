"use strict";

// Import statements
import {
  endpoints
} from './src';
import express from 'express';
import postgres from 'pg';
import cors from 'cors';
import bodyParser from 'body-parser';

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

// Enable CORS
app.use(cors());

// Parses incoming requests as JSON if parsable
app.use(bodyParser.json());

// Logs the incoming requests, useful for debugging
app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  // Print body
  console.log('Body');
  console.log(req.body);
  // Print query
  console.log('Query');
  console.log(req.query);
  next();
});

// eventUpdate endpoint
// This needs to be optimized
// setInterval(function() {app.get('/eventUpdate', async (req, res) => {await endpoints.eventUpdate(req, res, pool);});}, 1000);

// Login endpoint
app.post('/login', async (req, res) => {
  await endpoints.users.login(req, res, pool);
});

// Register endpoint
app.post('/register', async (req, res) => {
  await endpoints.users.register(req, res, pool);
});

// Gets users given an array of user IDs
app.get('/user/get', async (req, res) => {
  await endpoints.users.getUsers(req, res, pool);
});

// Create class endpoint
app.post('/class/create', async (req, res) => {
  await endpoints.classes.createClass(req, res, pool);
});

// Get classes endpoint
app.get('/class/get', async (req, res) => {
  await endpoints.classes.getClasses(req, res, pool);
});

// Create lesson endpoint
app.post('lesson/create', async (req, res) => {
  await endpoints.lessons.createLesson(req, res, pool);
});

// Get lesson endpoint
app.get('lesson/get', async (req, res) => {
  await endpoints.lessons.getLesson(req, res, pool);
});

// Get lessons endpoint
app.get('lessons/get', async (req, res) => {
  await endpoints.lessons.getLessons(req, res, pool);
});

// Get feedback endpoint
app.get('feedback/get', async (req, res) => {
  await endpoints.feedback.getFeedback(req, res, pool);
});

// Create feedback endpoint
app.post('feedback/create', async (req, res) => {
  await endpoints.feedback.createFeedback(req, res, pool);
});

app.listen(port, () => console.log(`Node is now listening on 192.168.99.100:${port}`));