import express from 'express';
import { findUser } from '../queries/user.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const { target, finder } = req.query;
  const user = await findUser({ userId: target });

  if (!user) {
    res.status(404).json('no data');
    return;
  }


  if (target !== finder) {
    res.status(200).json({ userId: user.userId, description: user.description });
  } else {
    res.status(200).json(user);
  }
});

export default router;