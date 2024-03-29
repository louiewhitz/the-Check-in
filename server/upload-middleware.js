// const fs = require('fs');

const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3 } = require('@aws-sdk/client-s3');

const s3 = new S3({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const storage = multerS3({
  s3,
  acl: 'public-read',
  // ☝️ so that anyone with a url can view the file
  bucket: process.env.AWS_S3_BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  // ☝️ so that when the file is downloaded,
  // the proper Content-Type header is set in the response
  key: (req, file, done) => {
    if (!file) {
      return;
    }
    const fileExtension = path.extname(file.originalname);
    done(null, `${Date.now()}${fileExtension.toLowerCase()}`);
  }
});

const uploadsMiddleware = multer({
  storage,
  fileFilter: (req, file, done) => {
    if (file) {
      return done(null, true);
    }
    done(null, false);
  }
}).single('image');

module.exports = uploadsMiddleware;
