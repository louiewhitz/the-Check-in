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

app.use(authorizationMiddleware);

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
    throw new ClientError(400, 'eventId must be a positive integer');
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
  set "updatedAt" = now(),
  "title" = $1,
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

app.post('/api/events', uploadsMiddleware, (req, res, next) => {
  const { title, description, summary, eventTypeId, timelineId, scheduleId } =
    req.body;

  const userId = req.user.userId;

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
    timelineId,
    userId
  ];

  db.query(sql, params)
    .then(result => {
      const [newEvent] = result.rows;
      res.status(201).json(newEvent);
    })
    .catch(err => next(err));
});

app.post('/api/timeline', (req, res, next) => {
  const { timelineFor, relation, friendSince } = req.body;

  // check here for conditionals
  if (!timelineFor || !relation || !friendSince) {
    throw new ClientError(400, 'timelineFor, relation, and friendSince are required');
  }
  const sql = `INSERT INTO "timelines" ("timelineFor", "relation", "friendSince")
   VALUES ($1, $2, $3) RETURNING *;`;
  const params = [timelineFor, relation, friendSince];
  db.query(sql, params)
    .then(result => {
      const [newTimeline] = result.rows;
      res.status(201).json(newTimeline);
    })
    .catch(err => next(err));
});

app.get('/api/timelines/:timelineId', (req, res, next) => {
  const timelineId = Number(req.params.timelineId);
  const { timelineFor, relation, friendSince } = req.body;
  if (!Number.isInteger(timelineId) || timelineId < 1) {
    throw new ClientError(
      400,
      `sorry, this ${timelineId} must be a positive integer`
    );
  }
  const sql = 'select "timelineId", "timelineFor", "relation", "friendSince" from "timelines" where "timelineId" = $1;';
  const params = [timelineId, timelineFor, relation, friendSince];
  db.query(sql, params)
    .then(result => {
      const [newTimeline] = result.rows;
      res.json(newTimeline);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
