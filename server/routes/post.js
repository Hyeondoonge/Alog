import express from 'express';
import { findPost } from '../queries/post.js';
import { findLiker } from '../queries/like.js';
import { docsMap, formatDate } from '../utils.js';
const router = express.Router();

// use함수를 이용해 사용자 권한을 체크하는 기능을 구현할 수 있다.

router.get('/', async (req, res) => {
  const { id } = req.query;
  let post = await findPost(id);
  const liker = await findLiker(id);

  post = docsMap([post], (post) => {
    post.writeDate = formatDate(post.writeDate);
    return post;
  });

  res.status(200).json({post: post[0], liker});
});

export default router;