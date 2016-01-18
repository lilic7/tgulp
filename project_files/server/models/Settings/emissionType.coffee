mongoose = require 'mongoose'
Schema = mongoose.Schema

typeSchema = new Schema {
    _id: {type: String}
  }

module.exports = mongoose.model "emissionType", typeSchema