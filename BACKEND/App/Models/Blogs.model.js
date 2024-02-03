const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    BlogName: {
        type: String,
        required: true,
    },
    Blog: {
        type: String,
        required: true,
    },
    BlogImg: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default:0
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
    
}, {
    // This enables Mongoose to handle the _id field automatically
    _id: true,
});

const Blogs = mongoose.model('blogs', BlogSchema);
module.exports = Blogs;
