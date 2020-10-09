const {
  Schema,
  model,
  Schema: {
    Types: { ObjectId },
  },
} = require("mongoose");

const CommentSchema = new Schema(
  {
    comment: { type: String, lowercase: true, trim: true, required: true },
    postId: { type: ObjectId, required: true, ref: "posts" },
    userId: { type: ObjectId, required: true, ref: "users" },
  },
  { timestamps: true }
);

module.exports = model("comments", CommentSchema);
