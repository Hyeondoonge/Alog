import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUser, hasDuplicatedUserId } from '../queries/user.js';
import { generateAccessToken, generateRefreshToken } from '../utils.js';
const router = express.Router();

router.get('/verifyToken', async (req, res) => {
  const accessToken = req.headers['authorization'].split(' ')[1];

  try {
    await jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY); // 증명
    res.status(200).end();
  } catch ({ name }) {
    if (name === "TokenExpiredError") res.status(401).json({ error: 'expired token'});
    else res.status(401).json({ error: 'token error'});
  }
})

router.get('/refreshToken', async (req, res) => {
  const refreshToken = req.headers['authorization'].split(' ')[1]; 

  try {
    const { userId, userNumber, platform } = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY); // 증명
    const accessToken = generateAccessToken(userId, userNumber, platform);
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: 'invalid token'});
  }
})

router.post('/signup', async (req, res, next) => {
    const { userId, platform, userNumber, description } = req.body;

    // 아이디 중복 확인
    const isValidUserId = !(await hasDuplicatedUserId(userId));

    if (isValidUserId) {
      createUser(req.body);
      next();
    } else {
      res.json({ msg: '이미 같은 닉네임을 가진 회원이 있어요' });
      return;
    }
  }, (req, res) => {
    // access_token 및 refresh_token을 생성.
    // 회원가입 성공 시 메인으로 리다이렉트.
    try {
      const { userId, platform, userNumber } = req.body;

      const accessToken = generateAccessToken(userId, userNumber, platform);
      const refreshToken = generateRefreshToken(userId, userNumber, platform);

      res.status(201).json({ accessToken, refreshToken, userId });
  
    } catch (error) {
      res.json({msg: 'END WITH ERROR'});
      console.log(error);
    }
});

router.post('/signin', async (req, res) => {
    // 새로운 access token과 refresh token 발급
  try {
      const { userNumber, platform } = req.body;
      const { userId } = await findUser(req.body);

      const accessToken = generateAccessToken(userId, userNumber, platform);
      const refreshToken = generateRefreshToken(userId, userNumber, platform);

      res.json({ accessToken, refreshToken, isMember: true, userId });
    } catch (error) {
      res.status(401).json({ isMember: false, msg: '로그인 할 수 없습니다'});
  }
});

router.get('/autoSignin', async (req, res, next) => {
    const accessToken = req.headers['authorization'].split(' ')[1];
    try {
      const { userId } = await jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY); // 증명
      // 증명에 성공
      res.json({ userId });
    } catch ({ name }) {
      if (name === "TokenExpiredError") res.status(401).json({ error: 'expired token'});
      else res.status(401).json({ error: 'token error'});
    }
});

router.post('/signout', async (req ,res) => {
  // client 단에서 access token을 만료시킨다.
  const token = req.headers['authorization'];
})

export default router;
