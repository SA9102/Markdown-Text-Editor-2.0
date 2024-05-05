const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        subfolders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Folder',
                required: false,
            },
        ],
        files: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'File',
                required: false,
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Folder', FolderSchema);
