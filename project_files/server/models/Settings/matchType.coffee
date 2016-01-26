mongoose = require 'mongoose'
Schema = mongoose.Schema

matchTypeSchema = new Schema {
  name: {type: String, required: true}

}

module.exports = mongoose.model "MatchType", matchTypeSchema