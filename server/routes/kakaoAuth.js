import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

const mode = 'production';

router.get('/loginUrl', async (req, res) => {
  const redirect_url = mode === 'develop' ? process.env.KAKAO_API_REDIRECT_URI_DM : process.env.KAKAO_API_REDIRECT_URI_PM;
  res.json({
    url: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_API_CLIENT_KEY}&redirect_uri=${redirect_url}`
  })
})

router.get('/token', async (req, res) => {
  const redirect_url = mode === 'develop' ? process.env.KAKAO_API_REDIRECT_URI_DM : process.env.KAKAO_API_REDIRECT_URI_PM;

  const { code } = req.query;

  try {
    const api_res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'post',
      headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body: `grant_type=authorization_code&client_id=${process.env.KAKAO_API_CLIENT_KEY}&redirect_uri=${redirect_url}&code=${code}`
    });
    const json = await api_res.json();
    res.json(json);
  } catch (error) {
    console.log(error);
    res.json({});
  }
})

router.get('/info', async (req, res) => {
  const kakao_accessToken = req.headers['authorization'].split(' ')[1]; 

  try {
    const api_res = await fetch('https://kapi.kakao.com/v1/user/access_token_info', {
      headers: {
        Authorization: `Bearer ${kakao_accessToken}`
      }
    });
    const json = await api_res.json();
    res.json(json); // 확인된 사용자
  } catch (error) {
    console.log(error);
    res.json({}); // 확인되지 않은 사용자
  }
})

router.get('/updateToken', async (req, res) => {
  const kakao_refreshToken = req.headers['authorization'].split(' ')[1]; 

  try {
    const api_res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      body: `grant_type=refresh_token&client_id=${process.env.KAKAO_API_CLIENT_KEY}&refresh_token=${kakao_refreshToken}`
    });
    const json = await api_res.json();
    res.json(json);
  } catch (error) {
    console.log(error);
    res.json({});
  }
})

router.get('/logout', async (req, res) => {
  const kakao_accessToken = req.headers['authorization'].split(' ')[1]; 

  try { // access token 만료됐다면?
    const api_res = await fetch(`https://kapi.kakao.com/v1/user/logout`, {
      headers: {
        Authorization: `Bearer ${kakao_accessToken}`
      }
    }
    );
    const json = await api_res.json();
    res.json(json);
  } catch (error) {
    console.log(error);
    res.json({});
  }
})

export default router;
