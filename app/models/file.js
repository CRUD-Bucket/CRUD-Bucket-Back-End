'use strict';

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // path: {
  //   type: String,
  //   required: true,
  // },
  url: {
    type: String,
    required: true,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
