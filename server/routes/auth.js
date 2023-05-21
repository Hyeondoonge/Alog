import express from 'express';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { createUser, findUser, hasDuplicatedUserId } from '../queries/user.js';
import { generateAccessToken, generateRefreshToken, getUploader } from '../utils.js';

const router = express.Router();

router.get('/verifyToken', async (req, res) => {
  const accessToken = req.headers['authorization'].split(' ')[1];

  try {
    await jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY); // 증명
    res.status(200).end();
  } catch ({ name }) {
    if (name === 'TokenExpiredError') res.status(401).json({ error: 'expired token' });
    else res.status(401).json({ error: 'token error' });
  }
});

router.get('/refreshToken', async (req, res) => {
  const refreshToken = req.headers['authorization'].split(' ')[1];

  try {
    const { userId, userNumber, platform } = await jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY
    ); // 증명
    const accessToken = generateAccessToken(userId, userNumber, platform);
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: 'invalid token' });
  }
});

router.post('/testerSignin', async (req, res) => {
  // 새로운 access token과 refresh token 발급
  try {
    const { userId, profilePath } = await findUser({ userId: 'ALOG 테스터' });
    const accessToken = generateAccessToken(userId, 0, 'alog');
    const refreshToken = generateRefreshToken(userId, 0, 'alog');
    res.json({ accessToken, refreshToken, userId, profile_fileName: profilePath });
  } catch (error) {
    res.status(401).json({ msg: '로그인 할 수 없습니다' });
  }
});

// /api/kakaoAuth/info로부터 userNumber를 얻는다.
router.use(async (req, res, next) => {
  try {
    const kakao_accessToken = req.headers['authorization'].split(' ')[1];

    const api_res = await fetch(`http://localhost:4500/kakaoAuth/info`, {
      headers: {
        Authorization: `Bearer ${kakao_accessToken}`
      }
    });
    const json = await api_res.json();
    const userNumber = json?.id ?? null;

    if (userNumber) {
      req.userNumber = userNumber;
      next();
    } else {
      res.json({ error: 'not verified user' });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: 'fetch error' });
  }
});

router.post('/checkMember', async (req, res) => {
  try {
    const { platform } = req.body;
    const { userNumber } = req;

    const user = await findUser({ userNumber, platform });

    if (user) {
      res.json({ isMember: true });
    } else {
      res.json({ isMember: false });
    }
  } catch (error) {
    res.status(401).json({ msg: '확인할 수 없습니다.' });
  }
});

const uplodaer = getUploader('./images/profile');
router.post(
  '/signup',
  uplodaer.single('profileImage'),
  async (req, res, next) => {
    const { userId, platform, description } = req.body;
    const { userNumber } = req;
    const isValidUserId = !(await hasDuplicatedUserId(userId));

    if (isValidUserId) {
      createUser({
        userId,
        platform,
        userNumber,
        description,
        profilePath: req.file?.filename ?? null
      });
      next();
    } else {
      res.status(409).end();
      return;
    }
  },
  (req, res) => {
    // access_token 및 refresh_token을 생성.
    // 회원가입 성공 시 메인으로 리다이렉트.
    try {
      const { userId, platform } = req.body;
      const { userNumber } = req;

      const accessToken = generateAccessToken(userId, userNumber, platform);
      const refreshToken = generateRefreshToken(userId, userNumber, platform);

      res
        .status(201)
        .json({ accessToken, refreshToken, userId, profilePath: req.file?.filename ?? null });
    } catch (error) {
      res.json({ msg: 'END WITH ERROR' });
      console.log(error);
    }
  }
);

// userNumber는 도용 방지를 위해, api_token으로 부터 읽어낸다.
router.post('/signin', async (req, res) => {
  // 새로운 access token과 refresh token 발급
  try {
    const { platform } = req.body;
    const { userNumber } = req;

    const { userId, profilePath } = await findUser({ userNumber, platform });

    const accessToken = generateAccessToken(userId, userNumber, platform);
    const refreshToken = generateRefreshToken(userId, userNumber, platform);

    res.json({ accessToken, refreshToken, userId, profile_fileName: profilePath });
  } catch (error) {
    res.status(401).json({ msg: '로그인 할 수 없습니다' });
  }
});

router.post('/signout', async (req, res) => {
  // client 단에서 access token을 만료시킨다.
  const token = req.headers['authorization'];
});

export default router;
