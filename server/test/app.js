require('dotenv').config();
const mongoose = require('mongoose');
const { postSchema } = require('./schemas');
const { handleError } = require('./handler');
const { connectDB } = require('./mongo');
const { createPostModel, findPost } = require('./models');

const { PORT, MONGO_URI, USER_ID, PASSWORD } = process.env;

connectDB(mongoose, MONGO_URI, USER_ID, PASSWORD);
const db = mongoose.connection;

const Post = createPostModel(db);
const doc = findPost(Post, (res) => {
  console.log(res);
});

// model 생성자를 이용해 document를 생성 / document = moodel의 인스턴스
// const firstPost = new Post({
//   title: '이건 아니야',
//   writer: '신현정',
// });

// 문법 1
// firstPost.save((err) => {
//   if (err) console.log(err);
// });

// 문법 2
// Post.insertMany([{
//   title: '이건 아니야',
//   writer: '신현정',
// }, {
//   title: '이건 맞아',
//   writer: '신동헌',
// }], (err) => {
//   if (err) console.log(err);
// });