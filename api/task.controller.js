const taskService = require('./task.service')

async function getTasks(req, res) {
    try {
        const tasks = await taskService.query(req.query)
        res.send(tasks)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get tasks' })
    }
}


async function getTaskById(req, res) {
    try {
        const taskId = req.params.taskId
        const task = await taskService.getById(taskId)
        res.json(task)

    } catch (err) {
        res.status(500).send({
            err: 'Failed to get task by id'
        })
    }
}


async function deleteTask(req, res) {
    try {
        await taskService.remove(req.params.taskId)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to delete task' })
    }
}


async function addTask(req, res) {
    try {
        var task = req.body
        task = await taskService.add(task)
        res.send(task)

    } catch (err) {
        console.log(err)
        res.status(500).send({ err: 'Failed to add task' })
    }
}

async function updateTask(req, res) {
    try {
        const { _id, text, day, done } = req.body
        const task = { _id, text, day, done }
        const savedTask = await taskService.update(task)
        res.json(savedTask)
    }
    catch (err) {
        res.status(500).send('cannot update task')
    }
}

module.exports = {
    getTasks,
    deleteTask,
    addTask,
    getTaskById,
    updateTask
}