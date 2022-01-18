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

const fetchSignin_POST = async (kakao_accessToken, platform) => {
  try {
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
  kakao_accessToken,
  platform,
  nickname,
  description,
  profileImage
) => {
  try {
    const formData = new FormData();
    formData.append('platform', platform);
    formData.append('userId', nickname);
    formData.append('description', description);
    if (profileImage) formData.append('profileImage', profileImage);

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
  fetchRefreshToken_GET
};
