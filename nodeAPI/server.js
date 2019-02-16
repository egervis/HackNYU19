"use strict";

// Import statements
import { endpoints } from './src/endpointMapper';
import express from 'express';
import postgres from 'pg';


const app = express();
const port = 3000;

// Initial endpoint
app.get('/', (req, res) => {
  endpoints.init(req, res);
});

app.listen(port);
