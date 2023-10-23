const express = require('express');

const userController = require('../controllers/user');
const validator = require('../utils/validator');
const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/:userId', isAuth, userController.getUserInfo);

module.exports = router;