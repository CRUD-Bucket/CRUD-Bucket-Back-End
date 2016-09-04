'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');
const path = require('path');

const crypto = require('crypto');

const s3Upload = (options) => {

  let stream = fs.createReadStream(options.path);
  let ext = path.extname(options.originalname);
  let folder = (new Date()).toISOString().split('T')[0];

  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  }).then((basename) => {

    let params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ContentType: options.mimetype,
      Key: `${folder}/${basename}${ext}`,
      Body: stream,
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  });
};

module.exports = s3Upload;
