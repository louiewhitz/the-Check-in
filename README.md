
![check-in-logo_1030x495](https://user-images.githubusercontent.com/99847558/214488676-31653df9-f182-4acb-a351-098d92c020f4.png)

# The Check-In
Check-in is a full stack web application built using the PERN (PostgreSQL, Express.js, React.js, Node.js) stack. It allows users to share information and schedule events for people they care about, such as elderly relatives or friends. The app allows users to track and manage the schedule of care for those in their network, ensuring that everyone is informed and on the same page. 

### Try the live demo [here](https://the-check-in.louisawhitaker.com/)
* Press **'Click to try!'** for quick sign in on sign-in page.

### Web App in Action:
![add-event](https://user-images.githubusercontent.com/99847558/214485012-db73c2dd-3dfb-4f3c-9e4b-9aaf02e5bbd9.gif)

![Kapture 2023-01-24 at 21 48 51](https://user-images.githubusercontent.com/99847558/214490067-ae1558a9-b4ba-4787-8e4e-a378528833f7.gif)


![calendar](https://user-images.githubusercontent.com/99847558/214485299-4b9835cb-6fc8-47c2-8653-674cbf9aa1da.gif)




## Technologies Used:



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


### License
The Check-In is licensed under the [MIT License](https://opensource.org/licenses/MIT).

