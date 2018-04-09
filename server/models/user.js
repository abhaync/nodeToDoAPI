const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens:[{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({
    _id: user._id.toHexString(),
    access
  },'123abc').toString();
  user.tokens.push({
    access,
    token
  });
  return user.save().then(() => {
    return token;
  });
};

userSchema.methods.toJSON = function() {
  let user = this;
  let userObj = user.toObject();
  return _.pick(userObj,['_id'],['email']);
}

userSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;
  try {
    decoded = jwt.verify(token,'123abc');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

userSchema.pre('save',function(next) {
  let user = this;
  // console.log(user);
  if(user.isModified('password')){
    console.log('1');
    bcrypt.genSalt(10, (err, salt) => {
      console.log('2');
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }else {
    next();
  }
})

let User = mongoose.model('User',userSchema);

module.exports = {
  User
}
