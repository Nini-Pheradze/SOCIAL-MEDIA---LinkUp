const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');

// signUp
const signUp = catchAsync(async(req, res, next) => {
    const { fullname, email, password } = req.body;

    if(!fullname || !email || !password) {
        return next(new AppError("Fullname, email, and password are required!", 400));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return next (new AppError("Email is already in use", 400));
    }

    const newUser = await User.create({
        fullname, 
        email,
        password
    });

    res.status(201).json({
        status: "success",
        message: "User registered successfully!",
        user: { fullname, email, _id: newUser._id},
    });
});

// logIn
const logIn = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new AppError("Email and password are required!", 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new AppError('Incorrect email or password', 401));
    }

    if(user.isBanned) {
        return next(new AppError("Your account is reported by admin!", 403));
    }

    const isMatching = await user.comparePassword(password);

    if(!isMatching) {
        return next(new AppError("Your email or password is Incorrect!", 401));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 14 * 24 * 60 * 60 * 1000
    });

    user.password = undefined;

    res.status(200).json({
        status: "success",
        token,
        user
    });
});

// loggingOut 
const logOut = catchAsync(async(req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true
    });

    res.status(200).json({ 
        status: 'success',
        message: 'Logged out successfully'
    });
});

// updating account
const updateMe = catchAsync(async( req, res, next) => {
    const filteredBody = {};
    if (req.body.fullname) filteredBody.fullname = req.body.fullname;

    if(req.files && req.files.profile) {
        filteredBody.avatar = req.files.profile[0].path;
    }

    if (req.files && req.files.cover) {
        filteredBody.coverPhoto = req.files.cover[0].path;
    }

    const updateUser = await User.findByIdAndUpdate(
        req.user._id || req.user.id,
        filteredBody,
        { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
        status: 'success',
        user: updateUser
    });
});

module.exports = { signUp, logIn, logOut, updateMe };