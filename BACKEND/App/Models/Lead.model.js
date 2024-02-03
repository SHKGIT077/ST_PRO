const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    PhoneNo: {
        type: String,
        required: true,
    },
    msg: {
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

const Leads = mongoose.model('lead', LeadSchema);
module.exports = Leads;
