![logo](https://louiewhitz.github.io/my-project/images/open-graph-image.png
)
# The Check-In
The Check-In is a web app designed to help users keep track of and stay connected with a loved one they may be concerned about. Whether it be an elderly family member or anyone else, The Check-In allows users to add events to a shared timeline, schedule future meetups, and share images with others.

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



### Requirements
  * PostgreSQL
  * Node.js
  * AWS-S3 bucket

## Getting Started
## Get Started

1. Clone the repository.

   ```shell
   git clone https://github.com/louiewhitz/final-project.git
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

- What port you'll be using while you build locally
- the name for your TOKEN_SECRET
- your database URL you've just created
- your AWS bucket information

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


- Clone the repository
Copy code
git clone https://github.com/[louiewhitz]/the-check-in.git
Install the necessary packages
Copy code
npm install
Start the development server
Copy code
npm start
Open http://localhost:3000 to view the app in the browser.
Features
Create a timeline of events for a loved one
Schedule future meetups
Share images with others
Secure user authentication using JsonWebToken and Argon2
Image storage on AWS-S3
Contribution
We welcome contributions to this project. If you are interested in contributing, please fork the repository and make a pull request.
### Requirements

- PostgreSQL
- Node.js
- AWS-S3 bucket


License
The Check-In is licensed under the MIT License.

