const bcrypt = require('bcryptjs');
const models = require('../db/models');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const exportObject = {};

exportObject.register = async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    next(new AppError('username, password, and email properties are require', 400));
    return;
  }

  const checkUsernameUsed = await models.User.findOne({ where: { username } });
  if (checkUsernameUsed) {
    res.status(409).json({ status: 'conflict', conflictProperti: 'username', message: 'username alredy used' });
    return;
  }
  const checkEmailUsed = await models.User.findOne({ where: { email } });
  if (checkEmailUsed) {
    res.status(409).json({ status: 'conflict', conflictProperti: 'email', message: 'email address alredy used' });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);
  models.User.create({ email, username, password: hashPassword })
    .then(async (user) => {
      const payload = { id: user.id };
      const token = await jwt.sign(payload, process.env?.CLIENT_JWT_KEY, {
        expiresIn: '3d',
      });
      res.json({ token });
    })
    .catch((err) => {
      res.status(500).json({ status: 'failed', message: 'Somthing went wrong', err });
    });
};

exportObject.login = async (req, res, next) => {
  res.json({ ok: 'ok' });
};

module.exports = exportObject;
