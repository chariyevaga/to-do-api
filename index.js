const dotenv = require('dotenv');
const path = require('path');
const { sequelize } = require('./db/models');

dotenv.config({ path: path.join(__dirname, './config/.env') });

const app = require('./app');
const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
  console.log(`Server is running ${PORT}`);
});

try {
  sequelize.authenticate(() => {
    console.log('\nDatabase is OK');
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
