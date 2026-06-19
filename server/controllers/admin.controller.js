const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// getting all users for admin
const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ 
        status: 'success', 
        results: users.length, 
        data: users 
    });
});

// deleting user
const deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new AppError("No user found with this ID", 404));
    }

    res.status(200).json({ status: 'success', data: null });
});

// blocking user
const banUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned: true }, {
        new: true,
        runValidators: true
    });

    if (!user) return next(new AppError('No User found with that ID', 404));

    res.status(200).json({ status: 'success', message: "User has been banned" });
});

// unblocking user
const unbanUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned: false }, {
        new: true
    });

    if (!user) return next(new AppError('User can not be found by this ID!', 404));

    res.status(200).json({ status: 'success', message: "User has been unbanned!" });
});

module.exports = { getAllUsers, deleteUser, banUser, unbanUser };