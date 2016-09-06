'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const File = models.file;

const multer  = require('multer');
const multerUpload = multer({ dest: '/tmp/' });

const s3Upload = require('lib/aws-s3-upload');

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  File.find()
    .then(files => res.json({ files }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  File.findById(req.params.id)
    .then(file => file ? res.json({ file }) : next())
    .catch(err => next(err));
};

const showRoot = (req, res, next) => {
  File.find({ path: req.params.path })
    .then(files => res.json({ files }))
    .catch(err => next(err));
};

const create = (req, res, next) => {
  s3Upload(req.file)
    .then((s3response) =>
      File.create({
        url: s3response.Location,
        name: req.body.image.name,
        _owner: req.currentUser._id,
        path: req.body.path,
      }))
    .then((file) => res.json({ file }))
    .catch((err) => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  File.findOne(search)
    .then(file => {
      if (!file) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return file.update(req.body.file)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  File.findOne(search)
    .then(file => {
      if (!file) {
        return next();
      }

      return file.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
  showRoot,
}, { before: [
  { method: multerUpload.single('image[file]'), only: ['create'] },
  { method: authenticate, except: ['index', 'show', 'showRoot'] },
], });
