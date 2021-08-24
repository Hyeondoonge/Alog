// const createError = require('http-errors');
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import postsRouter from './routes/posts.js';
import { connectDB } from './utils/mongo.js'

const { PORT, MONGO_URI, USER_ID, PASSWORD } = process.env;

connectDB(mongoose, MONGO_URI, USER_ID, PASSWORD);

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // 배열로 여러 도메인 등록도 가능
  methods: 'GET'
  // methods: 허용할 메소드 종류
  // optionSuccessStatus: options 요청의 성공 코드
  // preflightContinue: preflight응답을 다음 next 핸들러로 전달
};

app.use(logger('dev'));
app.use(cors(corsOptions));
// app.use(express.urlencoded({ extended: false }));

app.use('/posts', postsRouter);
app.use((req, res, next) => { // 매핑되는 경로 없을 때
  res.status(404).send('not found page');
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});

export default app;