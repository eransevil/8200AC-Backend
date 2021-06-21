const express = require('express')
const { getTasks, deleteTask, addTask, getTaskById, updateTask } = require('./task.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getTasks)
router.get('/:taskId', getTaskById)
router.post('/', addTask)
router.delete('/:taskId' , deleteTask)
router.put('/:taskId', updateTask)


module.exports = router