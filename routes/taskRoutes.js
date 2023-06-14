const express = require('express');
const routes = express.Router();

const controllers = require('../controllers/taskControllers.js');
const { tokenChecker } = require('../controllers/userControllers');

routes.get('/', tokenChecker, controllers.getTasks);
routes.post('/', tokenChecker, controllers.createNewTask);
routes.put('/:uuid', tokenChecker, controllers.updateTask);
routes.delete('/:uuid', tokenChecker, controllers.deleteTask);

module.exports = routes;
