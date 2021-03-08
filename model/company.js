'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let CompanySchema = new mongoose.Schema({
  name: String,
  typeText: String,
  parent_name: String,
  short_name: String,
  scheme: String,
  status: Number,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

CompanySchema.pre('save', function (next) {
  // isNew 是mongoose提供的
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('Company', CompanySchema)