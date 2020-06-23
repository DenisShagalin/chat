const Joi = require('joi');

const signinSchema = Joi.object().keys({
  nick: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).required(),
});

const signupSchema = Joi.object().keys({
  nick: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
});

const searchChatSchema = Joi.object().keys({
  search: Joi.string().required().allow(''),
  userId: Joi.number().required(),
});

const createNewChatSchema = Joi.object().keys({
  name: Joi.string().required(),
  creator: Joi.number().required(),
  type: Joi.string().required().allow(['public', 'private']),
  users: Joi.array().items(Joi.number()),
});

const messageSchema = Joi.object().keys({
  message: Joi.string().required(),
  chatId: Joi.string().required(),
  userId: Joi.number().required(),
});

const optionsSchema = Joi.object().keys({
  chatId: Joi.string().required(),
  userId: Joi.number().required(),
});

const postMessageSchema = Joi.object().keys({
  msgOptions: messageSchema,
  userOptions: optionsSchema,
});

const addMembersSchema = Joi.object().keys({
  chatId: Joi.string().required(),
  users: Joi.array().items(Joi.number()),
})

module.exports = {
  signinSchema,
  signupSchema,
  searchChatSchema,
  createNewChatSchema,
  optionsSchema,
  postMessageSchema,
  addMembersSchema,
};
