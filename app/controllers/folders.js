'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Folder = models.folder;

const authenticate = require('./concerns/authenticate');

//get all folders
const index = (req, res, next) => {
  Folder.find({ path: req.params.path })
    .then(folders => res.json({ folders }))
    .catch(err => next(err));
};

const showRoot = (req, res, next) => {
  Folder.find({ path: req.params.path })
    .then(folders => res.json({ folders }))
    .catch(err => next(err));
};

//get one folder by id
const show = (req, res, next) => {
  Folder.findById(req.params.id)
    .then(folder => folder ? res.json({ folder }) : next())
    .catch(err => next(err));
};

const showByOwner = (req, res, next) => {
  Folder.find({ path: req.currentUser._id })
    .then(folder => folder ? res.json({ folder }) : next())
    .catch(err => next(err));
};

//create a folder
const create = (req, res, next) => {
  let folder = Object.assign(req.body.folder, {
    _owner: req.currentUser._id,
  });
  Folder.create(folder)
    .then(folder => res.json({ folder }))
    .catch(err => next(err));
};

//create a rootfolder
const createRoot = (req, res, next) => {
  let folder = req.body.folder;
  Folder.create(folder)
    .then(folder => res.json({ folder }))
    .catch(err => next(err));
};

//update a folder by id
const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Folder.findOne(search)
    .then(folder => {
      if (!folder) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return folder.update(req.body.folder)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Folder.findOne(search)
    .then(folder => {
      if (!folder) {
        return next();
      }

      return folder.remove()
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
  showByOwner,
  createRoot,
  showRoot,
}, { before: [
  { method: authenticate, except: ['index', 'show', 'createRoot', 'showRoot'] },
], });
