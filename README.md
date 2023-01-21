![logo](https://github.com/louiewhitz/the-Check-in/blob/main/server/public/logo.png
)
# The Check-In
The Check-In is a web app designed to help users keep track of and stay connected with a loved one they may be concerned about. Whether it be an elderly family member or anyone else, The Check-In allows users to add events to a shared timeline, schedule future meetups, and share images with others.

### Try the live demo [here](https://the-check-in.louisawhitaker.com)
* Press **'Click to try!'** for quick sign in on sign-in page.

### Web App in Action:
![Kapture 2023-01-20 at 20 13 20](https://user-images.githubusercontent.com/99847558/213844389-05299800-5e11-469c-97a6-41dad6468f03.gif)
![Kapture 2023-01-20 at 20 15 57](https://user-images.githubusercontent.com/99847558/213844399-e2bcf96d-6be6-4005-9ebd-bca6bd2e8a25.gif)
![Kapture 2023-01-20 at 20 14 08](https://user-images.githubusercontent.com/99847558/213844248-6a2f2619-14a5-4944-b171-d9f4ab3924ae.gif)


## Technologies Used



* React
* Node.js
* HTML
* CSS
* JavaScript
* Bootstrap
* PostgreSQL
* Express
* Babel
* Webpack
* JsonWebToken
* Argon2
* AWS-S3
* Dokku
* Herokku
* React-Bootstrap
* React Big Calendar
* React-calendar-datetime-picker

## Features
* User can create a timeline of events for a loved one
* User can schedule future meetups
* User can upload an image and share images with others
* User can edit a title or desctiption of event
* User can delete event
* User can secure user authentication using JsonWebToken and Argon2
* User can store images on AWS-S3

## Getting Started


1. Clone the repository.

   ```shell
   git clone https://github.com/louiewhitz/the-Check-in.git
   ```

2. Install all dependencies with NPM.

   ```shell
   npm install
   ```

3. Create a new database.

   ```shell
   createdb checkInApp
   ```
4. Create your own `.env` with appropriate API keys following the `.env.example`.

   ```shell
   cp .env.example .env
   ```

5. Import the provided schema.sql and data.sql from the command line.

   ```shell
   npm run db:import
   ```

6. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

   ```shell
   npm run dev
   ```

### Your .env file will require:

1. What port you'll be using while you build locally
2. the name for your TOKEN_SECRET
3. your database URL
5. your AWS bucket information

### Necessary Packages
1. "@aws-sdk/client-s3": "^3.110.0",
2. "argon2": "^0.29.1",
3. "axios": "^1.2.1",
4. "bootstrap": "^5.1.0",
5. "core-js": "^3.27.0",
6. "date-fns": "^2.29.3",
7. "date-fns-tz": "^1.3.7",
8. "dotenv": "^16.0.3",
9. "eslint-config-standard": "^17.0.0",
10. "express": "^4.18.2",
11. "jsonwebtoken": "^9.0.0",
12. "jwt-decode": "^3.1.2",
13. "moment": "^2.29.4",
14. "multer": "^1.4.5-lts.1",
15. "multer-s3": "^3.0.1",
16. "pg": "^8.8.0",
17. "react": "^18.2.0",
18. "react-big-calendar": "^1.5.2",
19. "react-bootstrap": "^2.5.0-beta.1",
20. "react-calendar": "^4.0.0",
21. "react-calendar-datetime-picker": "^1.6.3",
22. "react-dom": "^18.2.0",
23.  "react-icons": "^4.6.0",
24. "react-multi-date-picker": "^3.3.4",


### Contribution
We welcome contributions to this project. If you are interested in contributing, please fork the repository and make a pull request.
### Requirements
- PostgreSQL
- Node.js
- AWS-S3 bucket


License
The Check-In is licensed under the MIT License.

