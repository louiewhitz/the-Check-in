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
app.use(express.json());

app.use(staticMiddleware);

app.get('/api/events', (req, res, next) => {
  const sql = `
    select *
      from "events"
      order by "eventId" desc
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/events', uploadsMiddleware, (req, res, next) => {
  const { title, description, summary, eventTypeId, timelineId, scheduleId } =
    req.body;

  const userId = 1;

  if (!title || !eventTypeId) {
    throw new ClientError(400, 'title and event type are required');
  }
  const photoUrl = `/images/${req.file.filename}`;
  const sql = `
   insert into "events" ("title", "summary", "description", "photoUrl", "eventTypeId", "timelineId", "userId")
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *;
  `;
  const params = [
    title,
    summary,
    description,
    photoUrl,
    eventTypeId,
    1,
    userId
  ];

  db.query(sql, params)
    .then(result => {
      const [newEvent] = result.rows;
      res.status(201).json(newEvent);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
