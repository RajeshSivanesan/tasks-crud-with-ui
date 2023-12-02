// @ts-nocheck
import express from 'express'
import Task from '../models/task'
import auth from '../middlewares/auth'
const router = express.Router()

router.post('/', auth, async (req, res) => {
    const task = new Task({
        ...req.body
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=true
// GET /tasks?priority=HIGH
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
// GET /tasks?search=aaa
router.get('/', auth, async (req, res) => {
    try {
        const match = {}
        const sort = {}
        const limit = req.query.limit;
        const skip = req.query.skip;

        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }

        if (req.query.search) {
            match.title = { $regex: new RegExp(req.query.search), $options: 'si' }
            match.description = { $regex: new RegExp(req.query.search), $options: 'si' }
        }

        if (req.query.priority) {
            match.priority = { $regex: new RegExp(req.query.priority), $options: 'si' };
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
        
        res.send({
            tasks: [...tasks],
            totalCount: Object.keys(match).length > 0 ? tasks?.length : await Task.collection.countDocuments()
        });
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
    try {
        const task = await Task.findOneAndUpdate({ _id: req.params.id }, {
            ...req.body
        }, { new: true });

        res.status(204).send({ completed: true });
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