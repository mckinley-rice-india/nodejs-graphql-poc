const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.userSchema = {
  username: Joi.string().trim().min(3).max(20),
  email: Joi.string().email().trim().min(10).required(),
  password: Joi.string().min(8).required(),
};

exports.postSchema = { body: Joi.string().trim().min(10).required() };

exports.commentSchema = {
  comment: Joi.string().trim().min(1).required(),
  postId: Joi.objectId().required(),
};
