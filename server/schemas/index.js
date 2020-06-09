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

module.exports = {
  signinSchema,
  signupSchema,
};
