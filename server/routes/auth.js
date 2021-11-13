import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUser, hasDuplicatedUserId } from '../queries/user.js';
import { generateAccessToken, generateRefreshToken } from '../utils.js';
const router = express.Router();

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

      const accessToken = generateAccessToken(uesrId, userNumber, platform);
      const refreshToken = generateRefreshToken(uesrId, userNumber, platform);

      res.status(201).json({ accessToken, refreshToken, userId });
  
    } catch (error) {
      res.json({msg: 'END WITH ERROR'});
      console.log(error);
    }
});

router.post('/signin', async (req, res) => {
    // 새로운 access token과 refresh token 발급
  try {
      const { platform, userNumber } = req.body;
      const { userId } = await findUser(req.body);

      const accessToken = generateAccessToken(userId, userNumber, platform);
      const refreshToken = generateRefreshToken(userId, userNumber, platform);

      res.json({ accessToken, refreshToken, isMember: true, userId });
    } catch (error) {
      res.status(401).json({ isMember: false, msg: '로그인 할 수 없습니다'});
  }
});

router.get('/autoSignin', async (req, res, next) => {
    // 새로운 access token 발급
    const accessToken = req.headers['authorization'].split(' ')[1];

    try {
      const { userId } = await jwt.verify(accessToken, process.env.SECRET_KEY); // 증명

      // 증명에 성공
      res.json({ userId });
    } catch (error) {
      console.log(accessToken);
      console.log(error);
      if (error.name === 'TokenExpiredError') {
        const { userId } = jwt.decode(accessToken);
        res.json({ userId, msg: "토큰 만료" });
      } else {
        res.status(401).json({ msg: '로그인 할 수 없습니다'});
    }
  }
});

router.get('/refreshToken', async(req, res) => {
  let refreshToken = req.headers['authorization'].split(' ')[1];

  try {
    const { userId, userNumber, platform } = await jwt.verify(refreshToken, process.env.SECRET_KEY); // 증명

    // refresh token이 유효함이 증명
    const accessToken = generateAccessToken(userId, userNumber, platform);
    res.json({ accessToken });
  } catch ({ name }) {
      if (name === 'TokenExpiredError') {
        const payload = jwt.decode(refreshToken);
        // access token, refresh token 갱신
        const accessToken = generateAccessToken(...payload);
        refreshToken = generateRefreshToken(...payload);
        res.json({ accessToken, refreshToken });
      } else {
        res.status(400).json({ msg: '요청을 처리할 수 없습니다'});
    }
  }
})

router.post('/signout', async (req ,res) => {
  // client 단에서 access token을 만료시킨다.
  const token = req.headers['authorization'];
})

export default router;
