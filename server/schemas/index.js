const Joi = require('joi');

const signinSchema = Joi.object().keys({
  nick: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).required(),
});

const signupSchema = Joi.object().keys({
  nick: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).required(),
  name: Joi.string().min(3).max(30).required().optional(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
});

const searchChatSchema = Joi.object().keys({
  search: Joi.string().required().allow(''),
});

const createNewChatSchema = Joi.object().keys({
  name: Joi.string().required(),
  creator: Joi.number().required(),
});

const messageSchema = Joi.object().keys({
  type: Joi.string().required().allow(['public', 'private']),
  message: Joi.string().required(),
  chatId: Joi.string().required(),
  userId: Joi.number().required(),
  recipientId: Joi.number().required().optional().allow(null),
});

const optionsSchema = Joi.object().keys({
  chatId: Joi.string().required(),
  userId: Joi.number().required(),
});

const postMessageSchema = Joi.object().keys({
  msgOptions: messageSchema,
  userOptions: optionsSchema,
});

module.exports = {
  signinSchema,
  signupSchema,
  searchChatSchema,
  createNewChatSchema,
  optionsSchema,
  postMessageSchema,
};
