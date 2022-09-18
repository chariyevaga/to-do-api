const express = require('express');
const routes = express.Router();

const userControllers = require('../controllers/userControllers');

/**
 * @swagger
 * paths:
 *  /v1/users/register:
 *      post:
 *          tags: [Register & login]
 *          summary: User register
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                                  example: chariyev
 *                              email:
 *                                  type: string
 *                                  example: agamyrat.chariyev@gmail.com
 *                              password:
 *                                  type: string
 *                                  example: F42daA
 *          responses:
 *              200:
 *                  description: Registered. Save token
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  token:
 *                                      type: string
 *              400:
 *                  description: Bad request. (email, username, password are required)
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedError'
 *              409:
 *                  description: some fileds are unique
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/ResponseRegisterConflict'
 *              500:
 *                  description: Unexpected error in server side
 *
 *components:
 *  schemas:
 *    ResponseRegisterConflict:
 *      type: object
 *      properties:
 *        status:
 *            type: string
 *            example: conflict
 *        conflictProperties:
 *            type: array
 *            items:
 *              type: string
 *              enum: [username, email]
 */
routes.post('/register', userControllers.register);
routes.post('/login', userControllers.login);

module.exports = routes;
