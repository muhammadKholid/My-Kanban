const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');
const authentication = require('../middlewares/authentication');

router.use('/', userRouter);
router.use('/tasks', authentication, taskRouter);

module.exports = router;
