import express from 'express';
import jwt from 'jsonwebtoken';
import { deleteLike, createLike, findLiker } from '../queries/like.js';
const router = express.Router();

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
    res.status(401).json({ msg: "서비스를 이용하려면 로그인 또는 회원가입이 필요합니다" });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { userId } = req;
    const { postId } = req.body;

    await createLike(postId, userId);
    const liker = await findLiker(postId);
    const isLiker = liker.some(({ userId: id }) => userId === id);

    res.json({ likeCount: liker.length, isLiker });
  } catch (error) {
    res.json({ msg: '실패!' });
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { userId } = req;
    const { postId } = req.body;

    await deleteLike(postId, userId);
    const liker = await findLiker(postId);
    const isLiker = liker.some(({ userId: id }) => userId === id);

    res.json({ likeCount: liker.length, isLiker });
  } catch (error) {
    res.json({ msg: '실패!' });
  }
});

export default router;