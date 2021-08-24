const { model } = require('mongoose');
const { postSchema } = require('./schemas');
const { handleError } = require('./handler');

// 연산 작성법 => 1. save() 2. query / 각각을 사용했을 때 차이점이 있다 (casting / middleware / validation)

// const Post = model('Post', postSchema);

const createPostModel = (db) => {
  return db.model('Post', postSchema); // 실제 db에서 posts (lowercase + plural)로 변경
};

const insertPosts = async (Post, callback) => {
  
};

// find
const findPost = async (Post, callback) => {
   // json > query builder, query builder 사용 시 체인이 많이 필요할 경우 가독성이 떨어진다

  // Post.find({ title: '이건 맞아' }, '_id',(err, post) => {
  //   if (err) return handleError(err);
  //   console.log(post);
  // });

  // try {
  //   const doc = await Post.find({ title: '이건 맞아' }).exec();
  //   callback(doc);
  // } catch (err) {
  //   console.log(err);
  // }
}

// update

// 위의 연산들은 db와 연결되어야지만 수행됨!

module.exports = { createPostModel, findPost };