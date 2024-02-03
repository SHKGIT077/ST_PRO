const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default:1
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
    
}, {
    // This enables Mongoose to handle the _id field automatically
    _id: true,
});

const Users = mongoose.model('user', UserSchema);
module.exports = Users;
