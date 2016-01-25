var Schema, mongoose, typeSchema;

mongoose = require('mongoose');

Schema = mongoose.Schema;

typeSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("EmissionType", typeSchema);
