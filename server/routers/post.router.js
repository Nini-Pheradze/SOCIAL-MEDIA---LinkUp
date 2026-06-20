const express = require('express');
const postRouter = express.Router();
const { postLike, addComment, deleteComment, editComment, deletePost, getAllPosts, createPost, editPost } = require('../controllers/post.controller');
const protect = require('../middlewares/protect.middleware');
const upload = require('../utils/image')


postRouter.use(protect);

// posts routing
postRouter.get('/', getAllPosts);
postRouter.patch('/:postId', editPost);
postRouter.delete('/:postId', deletePost);

postRouter.post('/', upload.single('postImage'), createPost); 

// likes
postRouter.post('/:postId/like', postLike);

// adding comments
postRouter.post('/:postId/comment', addComment);

// deleting comments
postRouter.delete('/:postId/comments/:commentId', deleteComment);

// edding comments
postRouter.patch('/:postId/comments/:commentId', editComment);

module.exports = postRouter;