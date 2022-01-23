// kakao 로그인 api test 용 컴포넌트

import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import { useRef, useState } from 'react';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import ModalContext from '../contexts/ModalContext';
import ThemeContext from '../contexts/ThemeContext';
import { useEffect } from 'react';
import { kakao_GetToken } from '../api/kakaoApi';
import { fetchCheckMember, fetchSignin_POST, fetchSignup_POST } from '../api/authApi';
import TextField from '../common/TextField';
import Template from '../Template';
import Button from '../common/Button';
import Loading from '../common/Loading';
import styled, { keyframes } from 'styled-components';
import { RiCloseCircleLine, RiGhost2Fill } from 'react-icons/ri';

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
  const [tokens, setTokens] = useState({ api_accessToken: '', api_refreshToken: '' }); // kakao api로부터 얻은 토큰을 임시적으로 저장하기 위한 상태
  const { api_accessToken, api_refreshToken } = tokens;
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');
  const [profile, setProfile] = useState({ file: null, localUrl: null });

  const [isCheckingMember, setIsCheckingMember] = useState(true);

  const history = useHistory();
  const inputRef = useRef(null);

  const replacePageTo = (path) => {
    history.replace(path);
  };

  const updateUserData = (newData) => {
    setUserData(newData);
    Object.keys(newData).forEach((key) => {
      if (newData[key]) window.localStorage.setItem(key, newData[key]);
    });
  };

  const checkValidInputs = (...inputs) => inputs.every((input) => input !== '');

  const requestSignUp = async (accesstoken, platform, nickname, desc, profileImage) => {
    const res = await fetchSignup_POST(accesstoken, platform, nickname, desc, profileImage);
    if (res.status === 201) return res.json();
    throw new Error(res.status === 409 ? '중복된 닉네임입니다.' : 'Something wrong...');
  };

  const onClick = () => {
    if (!checkValidInputs(nickname)) {
      setMessage('닉네임을 입력하세요');
      return;
    }

    (async () => {
      try {
        const { accessToken, refreshToken, userId, profilePath } = await requestSignUp(
          api_accessToken,
          'kakao',
          nickname,
          description,
          profile?.file ?? null
        );
        updateUserData({
          api_accessToken,
          api_refreshToken,
          accessToken,
          refreshToken,
          userId,
          profile_fileName: profilePath
        });
        setIsLoggedIn(true);
        replacePageTo('/');
      } catch (error) {
        setMessage(error.message);
      }
    })();
  };

  useEffect(() => {
    if (!code) return;
    (async () => {
      try {
        const [api_accessToken, api_refreshToken] = await kakao_GetToken(code);
        const isValidPlatformUser = api_accessToken !== undefined;

        if (!isValidPlatformUser) {
          replacePageTo('/');
          return;
        }

        setTokens({
          api_accessToken,
          api_refreshToken
        });

        const { isMember } = await fetchCheckMember('kakao', api_accessToken);

        if (isMember) {
          // !isMember
          setIsCheckingMember(false);
          return;
        }

        const { accessToken, refreshToken, userId, profile_fileName } = await fetchSignin_POST(
          api_accessToken,
          'kakao'
        );

        updateUserData({
          api_accessToken,
          api_refreshToken,
          accessToken,
          refreshToken,
          userId,
          profile_fileName
        });
        setIsLoggedIn(true);
        replacePageTo('/');
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!code) return <Template>404</Template>;

  if (isCheckingMember)
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
          Alog의 회원이 되어 더 많은 서비스를 이용해보세요 :)
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
                  setProfile({ file: null, localUrl: null });
                }}
              />
              {!profile.localUrl ? (
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
