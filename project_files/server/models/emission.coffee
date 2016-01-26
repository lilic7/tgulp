mongoose = require 'mongoose'
Schema = mongoose.Schema

emissionSchema = new Schema {
    name: {type: String, required: true},
    type: {type: String, required: true}, # Documentar, Talk-show, Promo, Divertisment, Informativ, Meciuri
    durations: {type: Array, required: true},
    total_duration: {type: Number, required: true}, # suma duratelor in cazul cand emisiunea e formata din cateva parti
    product: {type: String, required: true, default: "Autohton"}, # in program este indicat la campul Produs
    language: {type: String, required: true, default: "RO"},
    fileName: {type: String}, # Se formeaza automat din TODO care campuri
    details: {type: String}, # Careva detalii pentru o anumita emisiune
    first_show_date: {type: Date, required: true}, # data cand emisiunea a aparut prima data pe post
    limit_show_date: {type: Date} # OPTIONAL data limita cand emisiunea mai poate fi difuzata pe post
  }

module.exports = mongoose.model "Emission", emissionSchema