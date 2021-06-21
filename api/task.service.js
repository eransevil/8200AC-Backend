const dbService = require('../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbService.getCollection('task')
        const tasks = await collection.find().toArray()
        return tasks

    } catch (err) {
        logger.error('cannot find `tasks`', err)
        throw err
    }

}

async function remove(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        const query = {
            _id: ObjectId(taskId)
        }
        await collection.deleteOne(query)
    } catch (err) {
        throw err
    }
}

async function add(task) {
    
    try {
        const collection = await dbService.getCollection('task') //bring the collection
        await collection.insertOne(task)
        return task

    } catch (err) {
        throw err
    }

}

async function update(task) {
    try {
        console.log(task._id)
        const taskToAdd = {
            text: task.text,
            day: task.day,
            done: task.done,
        }
        const collection = await dbService.getCollection('task')
        await collection.updateOne({
            "_id": ObjectId(task._id)
        }, {
            $set: taskToAdd
        })
        return task;
    } catch (err) {
        throw err
    }
}

async function getById(id) {
    try {
        const collection = await dbService.getCollection('task') //bring the collection
        const task = await collection.findOne({
            "_id": ObjectId(id)
        })
        return task
    } catch (err) {
        throw err
    }
}


module.exports = {
    query,
    remove,
    add,
    update,
    getById
}