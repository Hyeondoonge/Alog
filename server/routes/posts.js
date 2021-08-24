import express from 'express';
import { findPost, countPosts } from '../utils/post.js';
const router = express.Router();

// use함수를 이용해 사용자 권한을 체크하는 기능을 구현할 수 있다.

// data formatting 함수 만들기

router.get('/search', async (req, res, next) => {

  const totalCount = await countPosts();
  const posts = await findPost(req.query.keyword);

  res.status(200).json({
    totalCount,
    posts
  });
});

export default router;