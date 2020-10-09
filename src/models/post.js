const {
  Schema,
  model,
  Schema: {
    Types: { ObjectId },
  },
} = require("mongoose");

const PostSchema = new Schema(
  {
    body: { type: String, lowercase: true, trim: true, required: true },
    userId: { type: ObjectId, required: true, ref: "users" },
  },
  { timestamps: true }
);

module.exports = model("posts", PostSchema);
