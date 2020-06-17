require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandlers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});
