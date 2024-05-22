const mongoose = require("mongoose");
const FileSchema = require("./File");

const FolderSchema = new mongoose.Schema(
  {
    // folderId: {
    //   type: String,
    //   required: true,
    // },
    // name: {
    //   type: String,
    //   required: true,
    // },
    // items: [
    //   {
    //     type: String,
    //     refPath: 'items.kind',
    //   },
    // ],
    data: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Folder", FolderSchema);
