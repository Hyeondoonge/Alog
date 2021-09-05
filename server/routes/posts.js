import express from 'express';
import { findPost, countPosts } from '../queries/post.js';
import { docsMap, formatDate } from '../utils.js';
const router = express.Router();

// use함수를 이용해 사용자 권한을 체크하는 기능을 구현할 수 있다.

// data formatting 함수 만들기

router.get('/search', async (req, res, next) => {
  const { keyword, writerId, cursor, size } = req.query;
  const totalCount = await countPosts(keyword);
  let posts = await findPost(keyword, writerId, cursor, size);

  // doc 데이터들 변형
  posts = docsMap(posts, (post) => {
    post.writeDate = formatDate(post.writeDate);
    return post;
  });

  if (!posts.length) {
    res.status(204).end();
    return;
  }

  res.status(200).json({
      totalCount,
      posts,
      cursor: posts[posts.length -1]._id
    });
});

export default router;