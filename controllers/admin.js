const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

/**
 * @description     Create a user
 * @route           POST /admin/create-user
 */
const postCreateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Error!');
        error.statusCode = 422;
        error.array = errors.array();
        return next(error);
    }

    try {
        const name = req.body.name;
        const surname = req.body.surname;
        const email = req.body.email;
        const password = await bcrypt.hash(req.body.password, 12);

        const newUser = new User({
            name,
            surname,
            email,
            password,
        });
        const user = await newUser.save();

        res.status(201).json({
            message: 'User created successfully!',
            user,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

module.exports = {
    postCreateUser,
};
