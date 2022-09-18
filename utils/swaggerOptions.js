module.exports = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Doingly',
      version: '1.0',
      description: 'Doingly documentation.',
      contact: {
        name: 'Agamyrat Chariyev',
        email: 'agamyrat.chariyev@gmail.com',
      },
    },
    servers: [
      {
        url: '{protocol}://{host}:{port}/api/',
        variables: {
          protocol: {
            enum: ['http', 'https'],
            default: 'http',
          },
          host: {
            enum: ['95.85.116.10', '172.10.18.3', 'localhost'],
            default: '95.85.116.10',
          },
          port: {
            default: '3003',
          },
        },
      },
    ],

    components: {
      securitySchemes: {
        client: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: "All client api's user this tokken",
        },
      },
      parameters: {
        offsetParam: {
          in: 'query',
          name: 'offset',
          description: 'The number of items to skip before starting to collect the result set',
          schema: {
            type: 'integer',
            minimum: 0,
          },
        },
        limitParam: {
          in: 'query',
          name: 'limit',
          description: 'The numbers of items to return.',
          schema: {
            type: 'integer',
            minimum: 1,
            default: 20,
          },
        },
        languageParam: {
          in: 'query',
          name: 'language',
          description: 'Used program language',
          schema: {
            type: 'string',
            enum: ['tm', 'ru', 'eng', 'tr'],
            default: 'tm',
          },
        },
        orderTypeParam: {
          in: 'query',
          name: 'orderType',
          description: 'Order by desc or asc',
          schema: {
            type: 'string',
            enum: ['asc', 'desc'],
            default: 'asc',
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication information is missing or invalid',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'fail',
                  },
                  message: {
                    type: 'string',
                    example: 'Unauthorized user',
                  },
                },
              },
            },
          },
        },
        PathIdRequiredError: {
          description: 'ID is required',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'fail',
                  },
                  message: {
                    type: 'string',
                    example: 'Id is required',
                  },
                },
              },
            },
          },
        },
        NotFoundError: {
          description: '[Model] is not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'fail',
                  },
                  message: {
                    type: 'string',
                    example: '[Model] is not found',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [`${__dirname}/../routes/*.js`],
};
