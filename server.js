const http = require('http');
const app = require('./app');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./src/config/dbConfig.js');

connectDB();

dotenv.config({ path: './src/config/config.env' });

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
