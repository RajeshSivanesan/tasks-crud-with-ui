// @ts-nocheck
import express from 'express'
import Task from '../models/task'
import auth from '../middlewares/auth'
const router = express.Router()

router.post('/', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/', auth, async (req, res) => {
    try {
        const match = {}
        const sort = {}
        const limit = req.query.limit;
        const skip = req.query.skip;

        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        const tasks = await Task
            .find(match)
            .sort(sort)
            .limit(limit)
            .skip(skip);
        
        res.send(tasks);
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowdUpdates = ['description', 'completed']
    const isValidOperation = updates.every(update => allowdUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send()
    }

    try {
        const task = await Task.findOne({ _id: req.params.id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

export default router