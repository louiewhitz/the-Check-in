/* eslint-disable no-unused-vars */
require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const path = require('path');
const uploadsMiddleware = require('./upload-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const publicPath = path.join(__dirname, 'public');

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

app.get('/api/events/:eventId', (req, res, next) => {
  const eventId = Number(req.params.eventId);
  if (!eventId) {
    throw new ClientError(400, 'entryId must be a positive integer');
  }
  const sql = `
   select *
     from "events"
     where "eventId" = $1
  `;
  const params = [eventId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find entry with eventId ${eventId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

// app.post('/api/auth/sign-up'), (req, res, next) => {
//   const { firstName, lastName } = req.body;
// }

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, firstName, lastName, password } = req.body;
  // console.log('REQ.BODY:', req.body);
  if (!username || !password || !lastName || !firstName) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        INSERT INTO "users" ("username", "firstName", "lastName", "hashedPassword")
        VALUES ($1, $2, $3, $4)
        RETURNING "username", "firstName", "lastName"
      `;
      const params = [username, firstName, lastName, hashedPassword];

      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "username",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { username, hashedPassword } = user;
      return argon2.verify(hashedPassword, password).then(isMatching => {
        if (!isMatching) {
          throw new ClientError(401, 'invalid login');
        }
        const payload = { username };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        res.json({ token, user: payload });
      });
    })
    .catch(err => next(err));
});
// app.use(authorizationMiddleware);

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
