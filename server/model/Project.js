import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: '',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    
    status: {
        type: String,
        enum: ['active', 'completed', 'pending'],
        default: 'active',
        required: true
    },
    duetime:{
        type: Date,
        default: null,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
});
export default mongoose.model("Project", projectSchema);