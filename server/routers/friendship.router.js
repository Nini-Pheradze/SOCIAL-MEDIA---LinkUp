const express = require('express');
const protect = require('../middlewares/protect.middleware');
const friendRouter = express.Router()

const { 
    sendFriendRequest, 
    acceptFriendRequest, 
    cancelOrRejectRequest, 
    unFriend, 
    getMyFriends, 
    searchUsers, 
    getUserById,
    getFriendRequests } = require('../controllers/friend.controller');

friendRouter.use(protect);

// user friends list
friendRouter.get('/my-friends',getMyFriends);

// sending friend request
friendRouter.post('/send-request/:userId', sendFriendRequest);

// cancelling rejecting friend request
friendRouter.post('/reject-request/:userId', cancelOrRejectRequest);

// deleting friend
friendRouter.post('/remove-friend/:userId', unFriend);

// accepting friend request
friendRouter.post('/accept-request/:userId', acceptFriendRequest);

// searching by name
friendRouter.get('/search', protect, searchUsers);

friendRouter.get('/user/:id',getUserById)

friendRouter.get('/friends/:userId', getMyFriends);

friendRouter.get('/requests', getFriendRequests);
module.exports = friendRouter;