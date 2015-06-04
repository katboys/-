var mongoose = require('mongoose');

var PostSchema = require('../schemas/post');

var Post = mongoose.model('Post',PostSchema);//post 是数据库

module.exports = Post;