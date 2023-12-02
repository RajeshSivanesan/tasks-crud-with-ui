import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        enum: ["HIGH", "LOW", "MEDIUM"],
        default: "LOW"
    },
    completed: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const TaskModel = mongoose.model('Tasks', taskSchema) 

export default TaskModel;