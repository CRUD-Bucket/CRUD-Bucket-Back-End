'use strict';

require('dotenv').load();

const s3Upload = require('../lib/aws-s3-upload');

const mime = require('mime');

const mongoose = require('../app/middleware/mongoose');
const Upload = require('../app/models/file');

let file = {
  filepath: process.argv[2],
  name: process.argv[3],
  path: process.argv[4],
  _owner: process.argv[5],
};

file.mimetype = mime.lookup(file.filepath);
file.originalname = file.filepath;

s3Upload(file)
  .then((s3response) =>
    Upload.create({
      url: s3response.Location,
      name: file.name,
      path: file.path,
      _owner: file._owner,
    }))
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .then(() => mongoose.connection.close());
