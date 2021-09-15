import express from 'express';
import { findLanguages } from '../queries/language.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
  const languages = await findLanguages();
  
  if (!languages.length) {
    res.status(204).end();
    return;
  }
  res.status(200).json({ languages });
});

export default router;