// kakao 로그인 api test 용 컴포넌트

import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import { useState } from 'react';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import ModalContext from '../contexts/ModalContext';
import ThemeContext from '../contexts/ThemeContext';
import { useEffect } from 'react';
import { kakao_GetToken, kakao_GetUserInfo, kakao_RefreshAccessToken } from '../api/kakaoApi';
import { fetchCheckMember, fetchSignin_POST, fetchSignup_POST } from '../api/authApi';
import TextField from '../common/TextField';
import Template from '../Template';
import Button from '../common/Button';
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
  const [tokens, setTokens] = useState(null); // kakao api로부터 얻은 토큰을 임시적으로 저장하기 위한 상태
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
      const res = await fetchSignup_POST(
        tokens.api_accessToken,
        'kakao',
        nickname,
        description,
        ''
      );
      if (res.status === 201) {
        const { userId, accessToken, refreshToken } = await res.json();
        setUserData({ api_accessToken: tokens.api_accessToken, accessToken, refreshToken, userId });
        setIsLoggedIn(true);
        window.localStorage.setItem('api_access_token', tokens.api_accessToken);
        window.localStorage.setItem('api_refresh_token', tokens.api_refreshToken);
        window.localStorage.setItem('access_token', accessToken);
        window.localStorage.setItem('refresh_token', refreshToken);
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
        const [api_accessToken, api_refreshToken] = await kakao_GetToken(code);
        if (!api_accessToken) {
          // 외부 플랫폼에서 미확인된 사용자
          history.replace('/');
          return;
        }

        setTokens({
          api_accessToken,
          api_refreshToken
        });

        const { isMember } = await fetchCheckMember('kakao', api_accessToken);

        if (!isMember) {
          isChecking(false);
          return;
        }

        const { accessToken, refreshToken, userId } = await fetchSignin_POST(
          api_accessToken,
          'kakao'
        );

        setUserData({
          api_accessToken,
          api_refreshToken,
          accessToken,
          refreshToken,
          userId: userId
        });
        setIsLoggedIn(true);
        window.localStorage.setItem('api_access_token', api_accessToken);
        window.localStorage.setItem('api_refresh_token', api_refreshToken);
        window.localStorage.setItem('access_token', accessToken);
        window.localStorage.setItem('refresh_token', refreshToken);
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
      <div
        style={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around'
        }}
      >
        <h1 style={{ padding: 0, margin: 0 }}>
          Alog의 회원이 되어 더 많은 서비스를 이용해보세요!{' '}
        </h1>
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
      </div>
    </Template>
  );
}
