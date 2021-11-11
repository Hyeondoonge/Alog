import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUser, hasDuplicatedUserId } from '../queries/user.js';
const router = express.Router();

const generateAccessToken = (userId, userNumber, platform) => {
  try {
    const token = jwt.sign({ userId, userNumber, platform }, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

// 동일 경로에 여러 메소드를 사용하는 경우,
// 체인 형식으로 코드 작성 가능

  router.post('/signup', async (req, res, next) => {
    // userNumber는 server측에서 설정할 수 있도록 한다.
    
    // 만약, api 서버가 가입 정보를 받은 후 가입이 이루어지도록하면
    // 올바르지 않은 가입자가 등록될 수 있다. => 플랫폼에서 로그인 확인된 사용자만 회원가입하는 것을 보장해야한다.

    // 카카오 로그인 -> 회원O 
    //            -> 회원X 회원가입 view
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

      res.status(201).json({ accessToken, userId });
  
    } catch (error) {
      res.json({msg: 'END WITH ERROR'});
      console.log(error);
    }
  });

  router.post('/signin', async (req, res) => {
    // 새로운 access token 발급
    try {
      const { platform, userNumber } = req.body;
      console.log(platform, userNumber);
      const { userId } = await findUser(req.body);
      const accessToken = generateAccessToken(userId, userNumber, platform);

      res.json({ isMember: true, accessToken, userId });
    } catch (error) {
      res.json({ isMember: false, msg: '로그인 할 수 없습니다'});
    }
  });

  router.post('/autoSignin', async (req, res) => {
    // 새로운 access token 발급
    try {
      const { accessToken } = req.body;

      const { userId, platform, userNumber } = await jwt.verify(accessToken, process.env.SECRET_KEY);

      res.json({ userId });
    } catch (error) {
      console.log(error);
      res.json({ msg: 'CAN NOT AUTO LOGIN'});
    }
  });

  router.post('/signout', async (req ,res) => {
    // client 단에서 access token을 만료시킨다.
    const token = req.headers['authorization'];
  })

export default router;
