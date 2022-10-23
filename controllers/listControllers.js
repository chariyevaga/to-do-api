const bcrypt = require('bcryptjs');
const models = require('../db/models');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const { request } = require('express');
const exportObject = {};

exportObject.createNewList = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    next(new AppError('name is require', 400));
    return;
  }

  models.List.create({ name, userId: req._userId }, { attributes: ['name'] })
    .then((list) => {
      const returnList = {};
      returnList.id = list.uuid;
      returnList.name = list.name;
      returnList.completedTaskCount = 0;
      returnList.taskCount = 0;
      res.json(returnList);
    })
    .catch((err) => {
      next(new AppError(err, 500));
    });
};

exportObject.updateList = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!name && !id) {
    next(new AppError('name and id are require', 400));
    return;
  }

  const list = await models.List.findOne({ uuid: id, userId: req._userId });
  if (!list) {
    next(new AppError('List not found', 404));
    return;
  }

  list.name = name;
  list
    .save()
    .then(() => {
      res.json({ status: 'success', message: 'List name changed' });
    })
    .catch((err) => {
      next(new AppError(err, 500));
    });
};

exportObject.getLists = async (req, res, next) => {
  models.List.findAll({
    where: { userId: req._userId },
    attributes: [
      ['uuid', 'id'],
      'name',
      [Sequelize.literal('0'), 'completedTaskCount'],
      [Sequelize.literal('0'), 'taskCount'],
    ],
  })
    .then((lists) => {
      res.json(lists);
    })
    .catch((err) => {
      next(new AppError(err, 500));
    });
};

exportObject.deleteList = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new AppError('id is require', 400));
    return;
  }

  const list = await models.List.findOne({ uuid: id, userId: req._userId });
  if (!list) {
    next(new AppError('List not found', 404));
    return;
  }

  list
    .destroy()
    .then(() => {
      res.json({ status: 'success', message: 'List deleted' });
    })
    .catch((err) => {
      next(new AppError(err, 500));
    });
};
module.exports = exportObject;
