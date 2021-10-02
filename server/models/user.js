import mongoose from 'mongoose'

const schema = mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: {
        type: String,
        default: new Date()
    }
});

export default mongoose.model("User", schema)
