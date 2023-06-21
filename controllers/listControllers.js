const bcrypt = require('bcryptjs');
const models = require('../db/models');
const AppError = require('../utils/appError');
const { Sequelize } = require('sequelize');
const { convertUuidToId } = require('../utils/uuidIdConverter');
const exportObject = {};

exportObject.getLists = async (req, res, next) => {
  models.List.findAll({
    where: { userId: req._userId },
    include: { model: models.Task, attributes: [] },
    group: ['"List".id', '"List".uuid', '"List".name'],
    attributes: [
      'uuid',
      'name',
      [Sequelize.literal('SUM( CASE WHEN "Tasks".completed THEN 1 ELSE 0 END)'), 'completedTaskCount'],
      [Sequelize.literal('COUNT("Tasks".id)'), 'taskCount'],
    ],
  })
    .then((lists) => {
      res.json(lists);
    })
    .catch((err) => {
      next(new AppError(err, 500));
    });
};

exportObject.createNewList = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    next(new AppError('name is require', 400));
    return;
  }

  models.List.create({ name, userId: req._userId }, { attributes: ['name'] })
    .then((list) => {
      const returnList = {};
      returnList.uuid = list.uuid;
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
  const { uuid } = req.params;
  if (!name && !uuid) {
    next(new AppError('name and uuid are require', 400));
    return;
  }

  const list = await models.List.findOne({ where: { uuid, userId: req._userId } });
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

exportObject.deleteList = async (req, res, next) => {
  const { uuid } = req.params;
  if (!uuid) {
    next(new AppError('uuid is require', 400));
    return;
  }

  const list = await models.List.findOne({ where: { uuid, userId: req._userId } });
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

exportObject.getTasks = async (req, res, next) => {
  const { uuid } = req.params;
  if (!uuid) {
    return next(new AppError('uuid is required', 400));
  }
  const listId = await convertUuidToId(models.List, uuid);
  await models.Task.findAll({
    where: { userId: req._userId, listId },
  })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      next(new AppError(err, 500));
    });
};
module.exports = exportObject;
