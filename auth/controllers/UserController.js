const User = require('../models/User')
const env = require('../DB')
const jwt = require('jsonwebtoken')

exports.register = function (req, res) {

  const { username, email, password, passwordConfirmation, admin } = req.body

  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }

  if (password != passwordConfirmation) {
    return res.status(422).json({ 'error': 'Password does not match' })
  }
  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).json({ 'error': 'Oops! Something went Wrong 1' })
    }
    if (existingUser) {
      return res.status(422).json({ 'error': 'User already exists' })
    }
    else {
      const user = new User({
        username, email, password
      })

      user.save(function (err) {
        if (err) {
          return res.status(422).json({
            'error': 'Either error has occured or email is not valid'
          })
        }
        return res.status(200).json({ 'registered': true })
      })
    }
  })
}
exports.login = function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }
  User.findOne({ email }, function (err, user) {
    if (err) {
      return res.status(422).json({
        'error': 'Oops! Something went wrong 3'
      })
    }

    if (!user) {
      return res.status(422).json({ 'error': 'Invalid user' })
    }

    if (user.hasSamePassword(password)) {
      json_token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        env.secret,
        { expiresIn: '1h' })

      return res.json(json_token)
    }
    else {
      return res.status(422).json({ 'error': 'Wrong email or password' })
    }
  })
}

exports.authMiddleware = function (req, res, next) {
  const json_token = req.headers.authorization
  try {
    if (json_token) {
      const user = parseToken(json_token)
      User.findById(user.userId, function (err, user) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong 4'
          })
        }
        if (user) {
          res.locals.user = user
          next()
        }
        else {
          return res.status(422).json({ 'error': 'Not authorized user' })
        }
      })
    }
    else {
      return res.status(422).json({ 'error': 'Not authorized user' })
    }
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err
    })
  }
}

exports.findAll = function (req, res) {
  User.find()
    .then(users => {
      res.send(users)
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
};

exports.findById = (req, res) => {
  User.findById(req.params.id, (err, user) => {
      if (err) throw err;
      res.send(user);
  })
};

exports.addUser = (req, res) => {
  User.create(req.body, (err, data) => {
      if (err) { throw err; }
      res.send(data);
  })
};

exports.removeById = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) throw err;
      res.send(user);
  })
}

exports.updateById = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
      if (err) throw err;
      res.send(user);
  })
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], env.secret)
}