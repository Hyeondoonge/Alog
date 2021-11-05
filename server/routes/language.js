import express from 'express';
import { findLanguages, findLanguagesByKeyword } from '../queries/language.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const languages = await findLanguages();
    
    if (!languages.length) {
      res.status(204).end();
      return;
    }
    res.status(200).json({ languages });
  } catch (error) {
    res.status(500).json({ languages: [] }); //  서버에러
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const languages = await findLanguagesByKeyword(keyword);
  
    res.set({
      'Cache-Control': 'max-age=3156000'
    }).status(200).json({ languages });
  } catch (error) {
    res.status(500).json({ languages: [] }); //  서버에러
  }
});

export default router;