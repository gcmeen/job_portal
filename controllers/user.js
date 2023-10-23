const Bcrypt = require('bcryptjs');

const User = require('../models/user');
const Define = require('../define/define');
const ModelUtil = require('../utils/models');
const ValidatorUtil = require('../utils/validator');
const CommonError = require('../define/common-error');
const Response = require('../define/response');

exports.getUserInfo = async (req, res, next) => {
    try {
        ValidatorUtil.catchValidation(req);
        const requestUserId = req.params.userId;
        const user = await User.findOne({ _id: requestUserId })
        if (!user) {
            CommonError.throwError401(Define.errUserNotExists);
        }
        Response.send(res, ModelUtil.getUser(user));
    } catch (err) { next(err) };
}