import express from 'express';
import jwt from 'jsonwebtoken';
import { insertPost, updatePost, findPost, findPosts, countPosts, leftPosts } from '../queries/post.js';
import { findLanguage } from '../queries/language.js';
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
  // keyword uri encode 하개ㅣ

  let { keyword, languages, cursor, size, writerId } = req.query;
  keyword = keyword.replace(/\+/g, '\\+');

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

// 인가
router.use((req, res, next) => {
  try {
    const accessToken = req.headers['authorization'].split(' ')[1]; 
    const { userId } = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    req.userId = userId;
    next();
  } catch (error) {
    if (name === 'TokenExpiredError') {
      res.status(401).json({ error: 'expired token' });
      return;
    }
    res.status(401).json({ msg: "서비스를 이용하려면 로그인 또는 회원가입이 필요합니다" });
  }
});


router.post('/', async (req, res) => {
  const { userId } = req;
  const { title, platform, language, content, subtitle } = req.body;
  const data = {
    title,
    platform,
    language,
    content,
    subtitle,
    writerId: userId, 
  }

  if (!title || !platform) {
    res.json({ msg: '문제 링크를 올려주세요' });
    return;
  }
  if (language && (await findLanguage(language)).length === 0) {
    res.json({ msg: '올바른 언어를 입력하세요' });
    return;
  }
  if (!content) {
    res.json({ msg: '풀이를 작성해주세요' });
    return;
  }
  const post = await insertPost(data);
  res.status(201).json({ post, msg: '정상적으로 글이 등록됐습니다' });
});

router.put('/', async (req, res) => {
  const { id } = req.query;
  const { userId } = req;
  const { title, platform, language, content, subtitle } = req.body;
  const data = {
    title,
    platform,
    language,
    content,
    subtitle,
    writerId: userId, 
  }

  if (!title || !platform) {
    res.json({ msg: '문제 링크를 올려주세요' });
    return;
  }
  if (language && (await findLanguage(language)).length === 0) {
    res.json({ msg: '올바른 언어를 입력하세요' });
    return;
  }
  if (!content) {
    res.json({ msg: '풀이를 작성해주세요' });
    return;
  }
  const post = await updatePost(id, data);
  res.status(201).json({ post, msg: '정상적으로 글이 수정됐습니다' });
});

export default router;