const express = require("express");
const cors = require("cors");
const routes = require('./routes/index');
require('dotenv').config();
const { meliKeyValidation } = require('./middlewares/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(meliKeyValidation);

routes(app);

module.exports = app;