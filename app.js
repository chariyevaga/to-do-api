const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();
const errorHandling = require('./utils/errorHandler');

// Docs
const swaggerOptions = require('./utils/swaggerOptions');
const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ credentials: true, origin: '*' }));

// Routes
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/lists', listRoutes);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'failed',
    message: `Can't find ${req?.orginalUrl ? req?.orginalUrl : 'request'} on this server`,
  });
});

app.use(errorHandling);

module.exports = app;
