'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let CategorySchema = new mongoose.Schema({
  name: String,
  status: Number,
  pid: String,
  parent: Object,
  meta: {
    creatAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

CategorySchema.pre('save', function (next) {
  // isNew
  if (this.isNew) {
    this.meta.creatAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('Category', CategorySchema)