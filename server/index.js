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

app.post('/api/uploads', uploadsMiddleware, (req, res, next) => {
  // console.log('req.file:', req.file);
  // https://www.npmjs.com/package/multer-s3#file-information
  if (!req.file) {
    // If there is no file, do nothing and return
    return;
  }

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

app.get('/api/schedules', (req, res, next) => {
  const sql = `select *
  from "schedules"
  order by "scheduleId" desc;`;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/schedules', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "title",
            
            
            "end",
            "start",
            "startDate",
            "startTime",
            "endTime",
          
            "timelineId"
      from "schedules"
      where "scheduleId" = $1`;
  const params = [userId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/schedules/schedule-time', (req, res, next) => {
  const { startDate, startTime, endTime, title, timelineId, start, end } = req.body;
  // const { userId } = req.user;

  const sql =
  `
    INSERT INTO "schedules" ("title", "startDate", "startTime", "endTime", "timelineId", "start", "end")
    VALUES ($1, $2, $3, $4, $5, $6, $7) returning *;
  `;
  const params = [title, startDate, startTime, endTime, timelineId, start, end];

  db.query(sql, params)
    .then(result => {
      const [scheduleEvent] = result.rows;
      res.status(201).json(scheduleEvent);
    })
    .catch(err => next(err));
});

app.get('/api/all-usernames', (req, res, next) => {
  const { username } = req.body;
  const { user } = req.user;
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

app.get('/api/all-users', (req, res, next) => {
  const { username } = req.body;
  const { user } = req.user;
  const sql = `
  select *
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

app.get('/api/events/:eventId', (req, res, next) => {
  const { userId } = req.user;

  const eventId = Number(req.params.eventId);
  if (!Number.isInteger(eventId) || eventId < 1) {
    throw new ClientError(
      400,
      `sorry, this ${eventId} must be a positive integer`
    );
  }

  const { photoUrl } = req.body;
  const sql = `
  select "photoUrl" from "events" where "eventId" = $1 and "userId" = $2;
  `;
  const params = [eventId, userId];
  db.query(sql, params)
    .then(result => {
      const [data] = result.rows;
      res.json(data);
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

app.get('/api/events/users/:eventId', (req, res, next) => {
  const { userId } = req.user;
  const { username } = req.body;
  const eventId = Number(req.params.eventId);
  const sql = 'select "users"."username", "users"."userId" from "users" join "events" using ("userId") where "events"."eventId" = $1';
  const params = [eventId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError(200, 'no users found');
      }
      const data = result.rows;
      res.json(data);

    })
    .catch(err => next(err));

});

app.post('/api/events/users/:eventId', (req, res, next) => {
  const { userId } = req.user;
  const { username } = req.body;
  const eventId = Number(req.params.eventId);
  const sql = 'select "users"."username", "users"."userId" from "users" join "events" using ("userId") where "events"."eventId" = $1';
  const params = [eventId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError(200, 'no users found');
      }
      const data = result.rows;
      res.json(data);

    })
    .catch(err => next(err));

});
// this is where we can add the schedule Id

app.post('/api/events', uploadsMiddleware, (req, res, next) => {
  const { title, description, summary, eventTypeId, timelineId, updatedAt, scheduleId } =
    req.body;
  const { userId } = req.user;

  if (!title || !eventTypeId) {
    throw new ClientError(400, 'title and event type are required');
  }
  const photoUrl = req.file ? req.file.location : null;

  const sql = `
   insert into "events" ("title", "summary", "description", "photoUrl", "eventTypeId", "timelineId", "updatedAt", "userId")
    values ($1, $2, $3, COALESCE($4, NULL), $5, $6, $7, $8)
    returning *;
  `;
  const params = [
    title,
    summary,
    description,
    photoUrl,
    eventTypeId,
    1,
    updatedAt,
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

app.delete('/api/events/delete/:eventId', (req, res, next) => {
  const { userId } = req.user;

  const eventId = Number(req.params.eventId);

  if (!Number.isInteger(eventId) || eventId < 1) {
    throw new ClientError(
      400,
      `sorry, this ${eventId} must be a positive integer`
    );
  }
  const sql = `delete
  from "events" where "userId" = $1 and "eventId" = $2 returning *;`;
  const params = [userId, eventId];
  db.query(sql, params)
    .then(result => {
      const deleteEvent = result.rows;
      res.json(deleteEvent);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
