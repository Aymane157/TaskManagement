import mongoose from "mongoose";
 const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo',
        required: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
        required: true
    },
    description: {
        type: String,
        default: '',
        required: true
    },
    duedate: {
        type: Date,
        default: null,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
        

    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }

});
    export default mongoose.model("Task", taskSchema);