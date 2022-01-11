import express from 'express';
import { findPost, findPosts, countPosts, leftPosts } from '../queries/post.js';
import {  formatDate } from '../utils.js';
import { findLiker } from '../queries/like.js';
const router = express.Router();

// use함수를 이용해 사용자 권한을 체크하는 기능을 구현할 수 있다.

router.get('/', async (req, res) => {
  const { id } = req.query;
  const post = await findPost(id);
  res.status(200).json(post);
});

// posts search
// writerId, language, cursor는 undefined로 전달될 수도 있는 값.
// 클라이언트 단에서 부터 요청 전 이를 처리해주도록 해야한다.
router.get('/search', async (req, res) => {
  let { keyword, languages, cursor, size, writerId } = req.query;
  const totalCount = await countPosts(keyword, languages ? languages.split(',') : null, writerId);
  const leftCount = await leftPosts(keyword, languages ? languages.split(',') : null, cursor, writerId);
  let posts = await findPosts(keyword, languages ? languages.split(',') : null, cursor, size, writerId);
  // doc 데이터들 변형
  posts = posts.map((post) => post.toObject());

  for(const post of posts) {
    post.likeCount = (await findLiker(post._id)).length;
    post.writeDate = formatDate(post.writeDate);
  }

  res.status(200).json({
      totalCount,
      leftCount: leftCount - posts.length,
      posts,
    });
});

export default router;