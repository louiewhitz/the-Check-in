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
const Client = require('pg/lib/client');

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
           "hashedPassword",
           "userId"
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
      const { username, hashedPassword, userId } = user;
      return argon2.verify(hashedPassword, password).then(isMatching => {
        if (!isMatching) {
          throw new ClientError(401, 'invalid login');
        }
        const payload = { username, userId };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        res.json({ token, user: payload });
      });
    })
    .catch(err => next(err));
});

app.get('/api/all-usernames', (req, res, next) => {
  const { username } = req.body;
  const sql = `
  select "username"
  from "users";
  `;
  db.query(sql)
    .then(result => {
      const users = [];
      result.rows.forEach(user => users.push(user.username));
      res.status(200).json(users);
    })
    .catch(err => next(err));
});

app.post('/api/uploads', uploadsMiddleware, (req, res, next) => {
  // console.log('req.file:', req.file);
  // https://www.npmjs.com/package/multer-s3#file-information

  const fileUrl = req.file.location; // The S3 url to access the uploaded file later

  /* "logic" */

  res.end(); // this is just here so my request doesn't hang
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'an unexpected error occurred (check the server terminal)'
  });
});

app.use(authorizationMiddleware);

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

app.get('/api/all-useridentification', (req, res, next) => {
  const { userId } = req.body;
  const sql = `
  select "userId"
  from "users";
  `;
  db.query(sql)
    .then(result => {
      const users = [];
      result.rows.forEach(user => users.push(user.userId));
      res.status(200).json(users);
    })
    .catch(err => next(err));
});

app.get('/api/events/:eventId', (req, res, next) => {
  const { userId } = req.user;

  const eventId = Number(req.params.eventId);
  if (!Number.isInteger(eventId) || eventId < 1) {
    throw new ClientError(
      400,
      `sorry, this ${eventId} must be a positive integer`
    );
  }

  const { title, description } = req.body;
  const sql = `
  select "title", "description", "createdAt" from "events" where "eventId" = $1 and "userId" = $2;
  `;
  const params = [eventId, userId];
  db.query(sql, params)
    .then(result => {
      const data = result.rows;
      res.json(data);
    })
    .catch(err => next(err));
});

app.post('/api/events', uploadsMiddleware, (req, res, next) => {
  const { title, description, summary, eventTypeId, timelineId, scheduleId } =
    req.body;

  // const userId = Number(req.user);
  const { userId } = req.user;

  if (!title || !eventTypeId) {
    throw new ClientError(400, 'title and event type are required');
  }
  const photoUrl = req.file.location;
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

app.patch('/api/events/:eventId', (req, res, next) => {
  const { userId } = req.user;

  const eventId = Number(req.params.eventId);
  if (!Number.isInteger(eventId) || eventId < 1) {
    throw new ClientError(
      400,
      `sorry, this ${eventId} must be a positive integer`
    );
  }
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ClientError(400, 'sorry, title and description are required');
  }
  const sql = `UPDATE "events"
  set "title" = $1,
  "description" = $2
   where "eventId" = $3 and "userId" = $4
   returning *;`;
  const params = [title, description, eventId, userId];
  db.query(sql, params)
    .then(result => {
      const [editedEvent] = result.rows;
      res.json(editedEvent);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
