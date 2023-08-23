const express = require('express');
const router = express.Router();
const todoController = require('../Controllers/TodoController');

// Define your routes here
router.post('/addTask', todoController.addNewTask);
router.get('/allTask', todoController.getAllTask);
router.get('/taskByID/:id', todoController.getTaskById);
router.patch('/updateTask/:id', todoController.updateTaskById);
router.delete('/delTask/:id', todoController.deleteTaskById);

module.exports = router;
