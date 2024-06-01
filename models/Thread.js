import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
    },
    content: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Thread", ThreadSchema);