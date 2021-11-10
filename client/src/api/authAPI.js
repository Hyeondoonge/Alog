const fetchAutoSignin_POST = async (accessToken) => {
  try {
    const res = await fetch('/api/auth/autoSignin', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ accessToken })
    });
    return res.json();
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

export { fetchAutoSignin_POST, fetchSignin_POST, fetchSignup_POST };
