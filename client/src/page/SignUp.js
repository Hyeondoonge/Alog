// kakao 로그인 api test 용 컴포넌트

import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import { useReducer, useRef, useState } from 'react';
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
import { RiCloseCircleLine, RiGhost2Fill } from 'react-icons/ri';
import { findByRole } from '@testing-library/react';

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
  const [profile, setProfile] = useState(null);

  const [checking, isChecking] = useState(true);

  const history = useHistory();
  const inputRef = useRef(null);

  const onClick = () => {
    if (!nickname) {
      setMessage('닉네임을 입력하세요');
      return;
    }
    (async () => {
      // html 인코딩 형식
      const res = await fetchSignup_POST(
        tokens.api_accessToken,
        'kakao',
        nickname,
        description,
        profile?.file ?? null,
        ''
      );
      if (res.status === 201) {
        const {
          userId,
          profilePath: profile_fileName,
          accessToken,
          refreshToken
        } = await res.json();

        console.log(profile_fileName);

        setUserData({
          api_accessToken: tokens.api_accessToken,
          accessToken,
          refreshToken,
          userId,
          profile_fileName
        });
        setIsLoggedIn(true);
        window.localStorage.setItem('api_access_token', tokens.api_accessToken);
        window.localStorage.setItem('api_refresh_token', tokens.api_refreshToken);
        window.localStorage.setItem('access_token', accessToken);
        window.localStorage.setItem('refresh_token', refreshToken);
        if (profile_fileName) window.localStorage.setItem('profile_file_name', profile_fileName);
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

        const { accessToken, refreshToken, userId, profile_fileName } = await fetchSignin_POST(
          api_accessToken,
          'kakao'
        );

        setUserData({
          api_accessToken,
          api_refreshToken,
          accessToken,
          refreshToken,
          userId,
          profile_fileName
        });
        setIsLoggedIn(true);
        window.localStorage.setItem('profile_file_name', profile_fileName);
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
            gap: '3rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              gap: '5rem'
            }}
          >
            <div style={{ position: 'relative' }}>
              <RiCloseCircleLine
                style={{ position: 'absolute', right: 0, cursor: 'pointer' }}
                onClick={() => {
                  setProfile(null);
                }}
              />
              {!profile ? (
                <div
                  style={{
                    backgroundColor: 'grey',
                    width: '20rem',
                    height: '20rem',
                    borderRadius: '50%',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '4rem',
                    border: '1px solid white'
                  }}
                >
                  <RiGhost2Fill size="10rem" />
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      position: 'relative',
                      width: '20rem',
                      height: '20rem',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '1px solid white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={profile.localUrl}
                      style={{
                        width: '30rem'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(event) => {
                const { files } = event.target;
                if (!files[0]) return;
                setProfile({ file: files[0], localUrl: URL.createObjectURL(files[0]) });
              }}
            />
            <Button
              label="이미지 로드"
              size="medium"
              color={theme.main}
              onClick={() => {
                inputRef.current.click();
              }}
            />
          </div>
          <div
            style={{
              flex: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: '5rem',
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
