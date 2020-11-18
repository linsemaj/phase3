const express = require('express')
const user = require('../controllers/UserController')
const router = express.Router()

const { authMiddleware } = require('../controllers/UserController')

router.post('/register', user.register)

router.post('/login', user.login)

router.get('/profile', authMiddleware, function (req, res) {
  res.json({ 'access': true })
})

router.get("/", user.findAll);
router.get("/:id", user.findById);
router.post("/", user.addUser);
router.put("/:id", user.updateById);
router.delete("/:id", user.removeById);

module.exports = router
