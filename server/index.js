/* eslint-disable no-unused-vars */
require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const path = require('path');
const uploadsMiddleware = require('./upload-middleware');

const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));
app.use(express.json());

app.use(staticMiddleware);
app.get('/api/events', (req, res) => {
  const sql = `select *
    from "events";`;
  db.query(sql)
    .then(result => {
      const allEvents = result.rows;
      res.status(200).json(allEvents);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ Error: 'An unexpected error occurred' });
    });
});

app.get('/api/events', (req, res) => {
  res.json({ hello: 'world' });
});

app.use(errorMiddleware);
app.post('/api/events/', (req, res) => {
  const photo = req.body.photoUrl;
  const title = req.body.title;
  const summary = req.body.summary;
  const comment = req.body.description;
  const eventId = req.body.eventId;
  const eventName = req.body.eventName;
  const timeline = req.body.timelineId;
  const scheduleId = req.body.scheduleId;

  // const eventId = Number(req.body.eventTypeId);
  // const { other, comment, eventId, userId } = req.body;
  // if (!Number.isInteger(eventId)) {
  //   res.status(400).json({
  //     error: 'I done goofed'
  //   });
  //   return;
  // }

  const sql = `
    insert into "events" ("eventId", "title", "summary", "description", "photoUrl", "userId", "other" )
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *;
  `;
  // const params = [task, isCompleted];
  db.query(sql /* ,p arams */)
    .then(result => {
      const [todo] = result.rows;
      res.status(201).json(todo);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
