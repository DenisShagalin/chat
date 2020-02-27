const Joi = require("joi");

const loginSchema = Joi.object().keys({
  nick: Joi.string()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .min(3)
    .required()
});

module.exports = {
  loginSchema
};
