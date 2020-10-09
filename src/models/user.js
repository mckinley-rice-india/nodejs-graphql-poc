const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      default: `user-${Math.random().toString(36).split('.')[1]}`,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((e) => {
      console.log('Error hashing password !');
    });
});

UserSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model('users', UserSchema);
