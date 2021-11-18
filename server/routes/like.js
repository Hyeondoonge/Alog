import express from 'express';
import jwt from 'jsonwebtoken';
import { deleteLike, createLike, findLiker } from '../queries/like.js';
const router = express.Router();

router.use((req, res, next) => {
  try {
    const accessToken = req.headers['authorization'].split(' ')[1]; 
    jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).end();
  }
});

// 현재 body는 쉽게 조작이 가능하다.
router.post('/', async (req, res, next) => {
  try {
    const { userId, postId } = req.body;

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
    const { userId, postId } = req.body;

    await deleteLike(postId, userId);
    const liker = await findLiker(postId);
    const isLiker = liker.some(({ userId: id }) => userId === id);

    res.json({ likeCount: liker.length, isLiker });
  } catch (error) {
    res.json({ msg: '실패!' });
  }
});

export default router;