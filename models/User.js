const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please type your name']
  },
  email: {
    type: String,
    required: [true, 'Please type your email']
  },
  password: {
    type: String,
    maxlength: [8, 'password too long']
  },
  places: [{
    type: Schema.Types.ObjectId,
    ref: 'Place'
  }]
})

userSchema.pre('save', function (next) {
  var user = this

  // only has the pw if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // hash the pw
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err)

    // override the cleartext pw with the hashed one
    user.password = hash
    next()
  })
})

const User = mongoose.model('User', userSchema)

module.exports = User
