const argon2 = require('argon2');

const password = process.argv[2];

argon2
  .hash(password)
  .then(hashedPassword => {

  })
  .catch(err => {
    console.error(err);
  });
