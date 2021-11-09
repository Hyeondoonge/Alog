// kakao 로그인 api test 용 컴포넌트

import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import { memo, useState } from 'react';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import ModalContext from '../contexts/ModalContext';
import { useEffect } from 'react';
// import { fetchToken_POST, fetchUserNumber_GET } from '../api/kakaoApi';
import { fetchSignin_POST, fetchSignup_POST } from '../api/authAPI';
import TextField from '../common/TextField';
import Template from '../Template';
import { RiUserSmileFill } from 'react-icons/ri';
import Button from '../common/Button';
import ThemeContext from '../contexts/ThemeContext';
import Loading from '../common/Loading';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  animation: ${fadeIn} 1s;
`;

export default function SignUp() {
  const [_, setIsLoggedIn, userData, setUserData] = useContext(UserContext);
  const [setMessage] = useContext(ModalContext);
  const theme = useContext(ThemeContext);

  const { code } = queryString.parse(useLocation().search);
  const [tokens, setTokens] = useState(null);
  const [userNumber, setUserNumber] = useState(null);
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');

  const [checking, isChecking] = useState(true);

  const history = useHistory();

  const onClick = () => {
    if (!nickname) {
      setMessage('닉네임을 입력하세요');
      return;
    }
    (async () => {
      const res = await fetchSignup_POST(userNumber, 'kakao', nickname, description, '');
      if (res.status === 201) {
        const { userId, accessToken } = await res.json();
        setUserData({ api_accessToken: tokens.api_accessToken, userId, accessToken });
        setIsLoggedIn(true);
        window.localStorage.setItem('access_token', accessToken);
        history.replace('/'); // 리다이렉트
      } else {
        const { msg } = await res.json();
        setMessage(msg);
      }
      return;
    })();
  };

  useEffect(() => {
    if (!code) return;
    (async () => {
      try {
        const [api_accessToken, api_refreshToken] = '';
        const userNumber = '';
        // const [api_accessToken, api_refreshToken] = await fetchToken_POST(code);
        // const userNumber = await fetchUserNumber_GET(api_accessToken);

        setTokens({
          api_accessToken,
          api_refreshToken
        });
        setUserNumber(userNumber);

        const { isMember, userId, accessToken } = await fetchSignin_POST(userNumber, 'kakao');
        if (!isMember) {
          isChecking(false);
          return;
        }
        setUserData({ api_accessToken, userId: userId, accessToken });
        setIsLoggedIn(true);
        window.localStorage.setItem('access_token', accessToken);
        history.replace('/');
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!code) return <Template>404</Template>;

  if (checking)
    return (
      <Template>
        <StyledDiv>
          <Loading />
        </StyledDiv>
      </Template>
    );

  return (
    <Template>
      <h1>Alog의 회원이 되어 더 많은 서비스를 이용해보세요! </h1>
      <div
        style={{
          display: 'flex',
          gap: 30
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            gap: 50
          }}
        >
          <div
            style={{
              backgroundColor: 'grey',
              width: 200,
              height: 200,
              borderRadius: 100,
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '4rem'
            }}
          >
            ᵔࡇᵔ
          </div>
          <Button label="이미지 로드" onClick={onClick} size="medium" color={theme.main} />
        </div>
        <div
          style={{
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 50,
            justifyContent: 'center'
          }}
        >
          <TextField
            label="닉네임"
            onChange={(event) => {
              setNickname(event.target.value);
            }}
          />
          <TextField
            label="한 줄 소개"
            fullWidth
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button label="가입" onClick={onClick} size="medium" color={theme.main} />
      </div>
    </Template>
  );
}
