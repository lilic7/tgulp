mongoose = require 'mongoose'
Schema = mongoose.Schema

typeSchema = new Schema {
    name: {type: String}
  }

module.exports = mongoose.model "emissionType", typeSchema