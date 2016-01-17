mongoose = require 'mongoose'
Schema = mongoose.Schema

emissionSchema = new Schema {
    name: {type: String, required: true},
    fileName: {type: String}
    type: {type: String, required: true},
    durations: {type: Array, required: true},
    total_duration: {type: Number, required: true}
    first_show_date: {type: Date, required: true},
    limit_show_date: {type: Date}
  }

module.exports = mongoose.model "Emission", emissionSchema