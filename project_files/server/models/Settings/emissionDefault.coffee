mongoose = require 'mongoose'
Schema = mongoose.Schema

emissionDefaultSchema = new Schema {
  defaultName: {type: String, required: true},
  defaultType: {type: String, required: true},

  defaultLength: {type: Number, required: true}
  defaultProgram: [
    {
      hour: {type: String}
      days: {type: Array}
    }
  ]
}

module.exports = mongoose.model "EmissionDefault", emissionDefaultSchema