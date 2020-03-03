const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  id_user: Joi.number().required(),
  name: Joi.string().required(),
})
