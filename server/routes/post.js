import express from 'express';
import jwt from 'jsonwebtoken';
import { insertPost, updatePost, findPost, deletePost } from '../queries/post.js';
import { findLanguage } from '../queries/language.js';
import { findLiker } from '../queries/like.js';
import { docsMap, formatDate } from '../utils.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const { id } = req.query;
  let post = await findPost(id);

  if (post == null) {
    res.status(200).json({ post: null, liker: null });
    return;
  }

  const liker = await findLiker(id);

  post = docsMap([post], (post) => {
    post.writeDate = formatDate(post.writeDate);
    return post;
  });

  res.status(200).json({ post: post[0], liker });
});

// 인가
router.use((req, res, next) => {
  try {
    const accessToken = req.headers['authorization'].split(' ')[1];
    const { userId } = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    req.userId = userId;
    next();
  } catch ({ name }) {
    if (name === 'TokenExpiredError') {
      res.status(401).json({ error: 'expired token' });
      return;
    }
    res.status(401).json({ msg: '서비스를 이용하려면 로그인 또는 회원가입이 필요합니다' });
  }
});

router.post('/', async (req, res) => {
  const { userId } = req;
  const { title, language, content, subtitle } = req.body;
  const data = {
    title,
    language,
    content,
    subtitle,
    writerId: userId
  };

  if (!title) {
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
  const { title, language, content, subtitle } = req.body;
  const data = {
    title,
    language,
    content,
    subtitle,
    writerId: userId
  };

  if (!title) {
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

router.delete('/', async (req, res) => {
  const { id } = req.query;
  const { userId } = req;

  // 삭제 요청된 글의 작성자와 요청자가 일치해야함.
  const post = await deletePost(id, userId);
  res.status(200).json({ msg: '정상적으로 글이 삭제됐습니다' });
});

export default router;
