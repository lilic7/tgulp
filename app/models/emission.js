var Schema, emissionSchema, mongoose;

mongoose = require('mongoose');

Schema = mongoose.Schema;

emissionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  durations: {
    type: Array,
    required: true
  },
  total_duration: {
    type: Number,
    required: true
  },
  product: {
    type: String,
    required: true,
    "default": "Autohton"
  },
  language: {
    type: String,
    required: true,
    "default": "RO"
  },
  fileName: {
    type: String
  },
  details: {
    type: String
  },
  first_show_date: {
    type: Date,
    required: true
  },
  limit_show_date: {
    type: Date
  }
});

module.exports = mongoose.model("Emission", emissionSchema);
