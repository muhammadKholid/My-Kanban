const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authorization = require('../middlewares/authorization');

router.post('/', taskController.addTask);
router.get('/', authorization, taskController.getAllTask);
router.get('/:id', authorization, taskController.getOneTask);
router.delete('/:id', authorization, taskController.delete);
router.put('/:id', authorization, taskController.update);

module.exports = router;
