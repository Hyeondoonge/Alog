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

const fetchSignin_POST = async (userNumber, platform) => {
  try {
    const res = await fetch('/api/auth/signin', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ userNumber, platform })
    });
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const fetchSignup_POST = async (userNumber, platform, nickname, description, profilePath) => {
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ userNumber, platform, userId: nickname, description, profilePath })
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

export { fetchAutoSignin_GET, fetchSignin_POST, fetchSignup_POST, fetchRefreshToken_GET };
