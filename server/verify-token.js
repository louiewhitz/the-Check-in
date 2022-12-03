require('dotenv/config');
const jwt = require('jsonwebtoken');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvdWlld2hpdHoiLCJ1c2VySWQiOjIsImlhdCI6MTY2OTY5MDExNX0.IFmUJuzS6v35H9ROMnlYgtNyhoi0mapy1PALARxMjSI';

try {
  const payload = jwt.verify(token, process.env.TOKEN_SECRET);
} catch (err) {
  console.error(err);
}
