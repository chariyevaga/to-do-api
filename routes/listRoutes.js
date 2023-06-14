const express = require('express');
const routes = express.Router();

const controllers = require('../controllers/listControllers');
const { tokenChecker } = require('../controllers/userControllers');

routes.get('/', tokenChecker, controllers.getLists);
routes.post('/', tokenChecker, controllers.createNewList);
routes.put('/:uuid', tokenChecker, controllers.updateList);
routes.delete('/:uuid', tokenChecker, controllers.deleteList);
routes.get('/:uuid/tasks', tokenChecker, controllers.getTasks);

module.exports = routes;
