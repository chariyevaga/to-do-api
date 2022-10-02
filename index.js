const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, './config/.env') });

const app = require('./app');
const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
  console.log(`Server is running ${PORT}`);
});
