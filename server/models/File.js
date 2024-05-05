const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('File', FileSchema);
