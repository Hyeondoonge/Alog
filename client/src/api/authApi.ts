import { User } from 'types/user';
import { safelyCheckUser } from './helper';

const fetchTesterSignin_POST: () => Promise<User | null> = async () => {
  try {
    console.log('this function in authApi.ts');
    const res = await fetch('/api/auth/testerSignin', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      }
    });
    const json = await res.json();
    Object.assign(json, {
      api_accessToken: null,
      api_refreshToken: null
    });
    safelyCheckUser(json);
    return json;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// @ts-ignore
const fetchCheckMember = async (platform, kakao_accessToken) => {
  try {
    const res = await fetch('/api/auth/checkMember', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${kakao_accessToken}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        platform
      })
    });
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

// @ts-ignore
const fetchAutoSignin_GET = async (accessToken) => {
  try {
    const res = await fetch('/api/auth/autoSignin', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// @ts-ignore
const fetchSignin_POST = async (kakao_accessToken, platform) => {
  try {
    console.log('this function in authApi.js');
    const res = await fetch('/api/auth/signin', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${kakao_accessToken}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        platform
      })
    });
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const fetchSignup_POST = async (
  // @ts-ignore
  kakao_accessToken, // @ts-ignore
  platform, // @ts-ignore
  nickname, // @ts-ignore
  description, // @ts-ignore
  profileImage
) => {
  try {
    const formData = new FormData();
    formData.append('platform', platform);
    formData.append('userId', nickname);
    formData.append('description', description);
    formData.append('profileImage', profileImage);

    const res = await fetch('/api/auth/signup', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${kakao_accessToken}`
      },
      body: formData
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// @ts-ignore
const fetchRefreshToken_GET = async (refreshToken) => {
  try {
    const res = await fetch('/api/auth/updateToken', {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  fetchCheckMember,
  fetchAutoSignin_GET,
  fetchSignin_POST,
  fetchSignup_POST,
  fetchRefreshToken_GET,
  fetchTesterSignin_POST
};
