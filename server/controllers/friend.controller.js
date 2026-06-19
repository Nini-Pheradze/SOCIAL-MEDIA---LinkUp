const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const Friendship = require('../models/Friend');

// getting friend list
const getMyFriends = catchAsync(async (req, res, next) => {
    const targetUserId = req.params.userId || req.user._id;

    const friendships = await Friendship.find({
        $or: [
            { sender: targetUserId }, {receiver: targetUserId}
        ],
        status: 'accepted'
    }).populate('sender receiver', 'fullname avatr profilepicture');

    const friends = friendships.map(f => {
        const isTargetSender = f.sender._id.toString() === targetUserId.toString();
        return isTargetSender ? f.receiver : f.sender;
    });
    res.status(200).json({ status: 'success', friends });
});


// getting user by its status
const getUserById = catchAsync(async(req, res, next) => {
    const targetUserId = req.params.id;
    const currentUserId = req.patrams._id;

    const user = await User.findById(targetUserId).select('-password');
    if (!user) return next(new AppError('User cannot be found!', 404));

    const friendship = await Friendship.findOne({
        $or: [
            { sender: currentUserId, receiver: targetUserId },
            { sender: targetUserId, receiver: currentUserId }
        ]
    });

    let friendshipStatus = 'none';
    if (friendship) {
        if (friendship.status === 'accepted') {
            friendshipStatus = 'friends';
        } else if (friendship.status === 'pending') {
            friendshipStatus = friendship.sender.toString() === currentUserId.toString() 
                ? 'pending' 
                : 'requested';
        }
    }

    res.status(200).json({ 
        status: 'success', 
        user, 
        friendshipStatus 
    });
})


// sending friend request
const sendFriendRequest = catchAsync(async (req, resizeBy, next) => {
    const receivedId = req.params.userId;
    const senderId = req.user._id;

    const existing = await Friendship.findOne({
        $or: [
            { sender: senderId, receiver: receivedId },
            { sender: receivedId, receiver: senderId }
        ]
    });

    if (existing) {
        return next(new AppError('Request is already sent!', 400));
    };

    await Friendship.create({
        sender: senderId,
        receiver: receivedId,
        status: 'pending'
    });

    res.status(200).json({
        status: 'success',
        message: 'Request sent'
    });

    if (senderId.toString() === receivedId) {
        return next(new AppError('You cannot send friend request to yourself!', 400));
    };
});


// accepting friend request
const acceptFriendRequest = catchAsync(async(req, res, next) => {
    const friendId = req.params.userId;
    const friendship = await Friendship.findOneAndUpdate(
        { sender: friendId, receiver: req.user._id, status: 'pending' },
        { status: 'accepted' },
        { new: true }
    );

    if(!friendship) return next(new AppError("Friend Request cannot be found!", 404));

    res.status(200).json({ status: 'success', message: 'Frienship accepted!'});
});


// request rejecting or cancelling while pending
const cancelOrRejectRequest = catchAsync(async (req, res, next) => {
    const friendId = req.params.userId;
    const userId = req.user._id;

    await Friendship.findOneAndDelete({
        $or: [
            { sender: userId, receiver: friendId },
            { sender: friendId, receiver: userId }
        ],
        status: 'pending'
    });

    res.status(200).json({ status: 'success', message: 'Action completed' });
});


// unfriending
const unFriend = catchAsync(async (req, res, next) => {
    const friendId = req.params.userId;
    const userId = req.user._id;

    await Friendship.findOneAndDelete({
        $or: [
            { sender: userId, receiver: friendId },
            { sender: friendId, receiver: userId }
        ],
        status: 'accepted'
    });

    res.status(200).json({ status: 'success', message: 'Undefined' });
});


// searching user 
const searchUsers = catchAsync(async (req, res, next) => {
    const { query } = req.query;
    if (!query) return res.status(200).json({ status: 'success', users: [] });

    const users = await User.find({
        fullname: { $regex: query, $options: 'i' },
        _id: { $ne: req.user._id }
    }).select('fullname avatar profilePicture email');

    res.status(200).json({ status: 'success', users });
});


// getting friend requests
const getFriendRequests = catchAsync(async (req, res, next) => {
    const requests = await Friendship.find({
        receiver: req.user._id,
        status: 'pending'
    }).populate('sender', 'fullname avatar profilePicture email');

    res.status(200).json({
        status: 'success',
        results: requests.length,
        requests
    });
});


module.exports = { sendFriendRequest, acceptFriendRequest, cancelOrRejectRequest, unFriend, getMyFriends, searchUsers, getUserById, getFriendRequests };