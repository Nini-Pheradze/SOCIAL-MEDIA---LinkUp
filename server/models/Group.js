const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    public: {
        type: Boolean,
        default: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Group must hava an admin!"]
    },
    title: {
        type: String,
        required: [true, 'Title is required!'],
        trim: true
    }
}, { timestamps: true});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;