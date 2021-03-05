'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let DepartmentSchema = new mongoose.Schema({
  region_name: String,
  region_id: Number,
  status: Number,
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

DepartmentSchema.pre('save', function (next) {
  // isNew
  if (true) {
    this.meta.creatAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('Department', DepartmentSchema)