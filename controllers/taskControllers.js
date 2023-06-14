const bcrypt = require('bcryptjs');
const models = require('../db/models');
const AppError = require('../utils/appError');
const { Sequelize } = require('sequelize');
const { convertUuidToId } = require('../utils/uuidIdConverter');
const exportObject = {};

exportObject.getTasks = async (req, res, next) => {
  const { search, completed } = req.query;
  let where = { userId: req._userId };
  if (completed) {
    where.completed = completed === 'true';
  }
  if (search) {
    where.text = { [Op.iLike]: `%${search}%` };
  }
  models.Task.findAll({
    where,
    include: [{ model: models.List, attributes: ['uuid', 'name'] }],
  })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      next(new AppError(err, 500));
    });
};

exportObject.createNewTask = async (req, res, next) => {
  const { text, completed, listUuid } = req.body;
  if (!text) {
    next(new AppError('text is require', 400));
    return;
  }
  let listId = await convertUuidToId(models.List, listUuid);

  models.Task.create({ text, completed, userId: req._userId, listId }, { attributes: ['name'] })
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      next(new AppError(err, 500));
    });
};

exportObject.updateTask = async (req, res, next) => {
  const { text, completed, listUuid } = req.body;
  const { uuid } = req.params;

  let updateData = req.body;

  if (listUuid) {
    updateData.listId = await convertUuidToId(models.List, listUuid);
  }

  const task = await models.Task.findOne();
  if (!task) {
    next(new AppError('Task not found', 404));
    return;
  }

  models.Task.update(updateData, { where: { uuid, userId: req._userId } })
    .then(() => {
      res.json({ status: 'success', message: 'Task changed' });
    })
    .catch((err) => {
      next(new AppError(err, 500));
    });
};

exportObject.deleteTask = async (req, res, next) => {
  const { uuid } = req.params;
  if (!uuid) {
    next(new AppError('uuid is require', 400));
    return;
  }

  const task = await models.Task.findOne({ uuid, userId: req._userId });
  if (!task) {
    next(new AppError('Task not found', 404));
    return;
  }

  task
    .destroy()
    .then(() => {
      res.json({ status: 'success', message: 'Task deleted' });
    })
    .catch((err) => {
      next(new AppError(err, 500));
    });
};

module.exports = exportObject;
