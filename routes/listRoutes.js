const express = require('express');
const routes = express.Router();

const controllers = require('../controllers/listControllers');
const { tokenChecker } = require('../controllers/userControllers');

/**
 * @swagger
 * paths:
 *  /v1/lists:
 *      post:
 *          tags: [Lists]
 *          summary: Create List
 *          security:
 *              - user: []
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Registered. Save token
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                  name:
 *                                      type: string
 *                                  taskCount:
 *                                      type: integer
 *                                  completedTaskCount:
 *                                      type: integer
 *              400:
 *                  description: Bad request. name is required
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              500:
 *                  description: Unexpected error in server side
 *
 */
routes.post('/', tokenChecker, controllers.createNewList);

/**
 * @swagger
 * paths:
 *  /v1/lists/{id}:
 *      put:
 *          tags: [Lists]
 *          summary: Update list name
 *          security:
 *              - user: []
 *          parameters:
 *              - in: paths
 *                name: id
 *                type: string
 *                required: true
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Registered. Save token
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: success
 *                                  message:
 *                                      type: string
 *                                      example: List name changed
 *              400:
 *                  description: Bad request. new name and id are required
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  description: You don't have a list by your sender id
 *              500:
 *                  description: Unexpected error in server side
 *
 */
routes.put('/:id', tokenChecker, controllers.updateList);

/**
 * @swagger
 * paths:
 *  /v1/lists:
 *      get:
 *          tags: [Lists]
 *          summary: Update list name
 *          security:
 *              - user: []
 *          responses:
 *              200:
 *                  description: Registered. Save token
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: string
 *                                      name:
 *                                          type: string
 *                                      completedTaskCount:
 *                                          type: integer
 *                                      taskCount:
 *                                          type: integer
 *              400:
 *                  description: Bad request. name is required
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              404:
 *                  description: You don't have a list by your sender id
 *              500:
 *                  description: Unexpected error in server side
 *
 */
routes.get('/', tokenChecker, controllers.getLists);

module.exports = routes;
