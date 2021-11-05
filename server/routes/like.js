import express from 'express';
import { deleteLike, createLike, findLiker } from '../queries/like.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const { postId, userId } = req.body;
    await createLike(req.body);
    const liker = await findLiker(postId);
    res.json(liker);
  } catch (error) {
    console.log(error);
    res.json({ msg: '실패!' });
  }
});

router.delete('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const { postId, userId } = req.body;
    await deleteLike(req.body);
    const liker = await findLiker(postId);
    res.json(liker);
  } catch (error) {
    res.json({ msg: '실패!' });
  }
});

export default router;