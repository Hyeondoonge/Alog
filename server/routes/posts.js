import express from 'express';
import { insertPost, updatePost, findPost, countPosts } from '../queries/post.js';
import { findLanguage } from '../queries/language.js';
import { docsMap, formatDate } from '../utils.js';
const router = express.Router();

// use함수를 이용해 사용자 권한을 체크하는 기능을 구현할 수 있다.

// writerId, language, cursor는 undefined로 전달될 수도 있는 값.
// 클라이언트 단에서 부터 요청 전 이를 처리해주도록 해야한다.

router.post('/', async (req, res) => {
  const { title, platform, language, content } = req.body;

  if (!title || !platform) {
    res.json({ msg: '문제 링크를 올려주세요' });
    return;
  }
  if (language && (!await findLanguage(language))) {
    res.json({ msg: '올바른 언어를 입력하세요' });
  }
  if (!content) {
    res.json({ msg: '풀이를 작성해주세요' });
    return;
  }
  insertPost(req.body);
  res.status(200);
});


router.update('/', async (req, res) => {
  const { title, platform, language, content } = req.body;

  if (!title || !platform) {
    res.json({ msg: '문제 링크를 올려주세요' });
    return;
  }
  if (language && (!await findLanguage(language))) {
    res.json({ msg: '올바른 언어를 입력하세요' });
  }
  if (!content) {
    res.json({ msg: '풀이를 작성해주세요' });
    return;
  }
  updatePost(req.body);
  res.status(200);
});

// post search
router.get('/search', async (req, res, next) => {
  const { keyword, languages, cursor, size, writerId } = req.query;
  
  console.log(req.query);

  const totalCount = await countPosts(keyword, languages ? languages.split(',') : null, writerId);
  let posts = await findPost(keyword, languages ? languages.split(',') : null, cursor, size, writerId);

  // doc 데이터들 변형
  posts = docsMap(posts, (post) => {
    post.writeDate = formatDate(post.writeDate);
    return post;
  });

  // if (!posts.length) {
  //   res.status(204).end();
  //   return;
  // }

  res.status(200).json({
      totalCount,
      posts,
    });
});

export default router;