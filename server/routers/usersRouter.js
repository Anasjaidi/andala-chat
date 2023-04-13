const express = require('express')
const { signup, signin, getAllUsers } = require('../controllers/usersController')
const ErrorsWrapper = require('../errors/errorsWrapper')
const authDAO = require('../classes/auth')



const router = express.Router()

router.route("/signup").post(ErrorsWrapper(signup))
router.route("/signin").post(ErrorsWrapper(signin))

router.route('/')
      .get(ErrorsWrapper(authDAO.protectRoute) ,ErrorsWrapper(getAllUsers))

module.exports = router