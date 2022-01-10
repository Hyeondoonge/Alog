import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import postsRouter from './routes/posts.js';
import postRouter from './routes/post.js';
import languageRouter from './routes/language.js';
import likeRouter from './routes/like.js';
import authRouter from './routes/auth.js';
import kakaoAuthRouter from './routes/kakaoAuth.js';
import { connectDB } from './queries/mongo.js'

const { PORT, MONGO_URI, USER_ID, USER_PASSWORD } = process.env;

connectDB(mongoose, MONGO_URI, USER_ID, USER_PASSWORD);

const app = express();
app.use(cors({
  origin: 'https://alog.netlify.app'}));
app.use(express.json());
app.use(logger('dev'));
// app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.set('Cache-control', 'must-revalidate, max-age=31536000')
  next();
})
app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/languages', languageRouter);
app.use('/like', likeRouter);
app.use('/auth', authRouter);
app.use('/kakaoAuth', kakaoAuthRouter);

app.use((req, res, next) => { // 매핑되는 경로 없을 때
  res.status(404).send('다시 존재하지 않는 페이지!!!');
});

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
});

export default app;