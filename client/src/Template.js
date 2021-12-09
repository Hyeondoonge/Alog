import { useRef } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import Button from './common/Button';
import StickyHeader from './common/StickyHeader';
import ThemeContext from './contexts/ThemeContext';
import UserContext from './contexts/UserContext';
import { RiCloseFill, RiPencilFill } from 'react-icons/ri';
import { useHistory } from 'react-router';
import { fetchRefreshToken_POST } from './api/kakaoApi';
import Link from './common/Link';

const StyledBody = styled.div`
  width: 100%;
  font-size: 2rem;
  @media screen and (min-width: 600px) {
    & > * {
      margin: 5% 10% !important;
    }
  }
  & > * {
    margin: 7% 5%;
  }
`;

const StyledCard = styled.div`
  width: 500px;
  height: fit-content;
  background-color: ${(props) => props.color ?? 'white'};
  color: black;
  border-radius: 10px;
  padding: 5rem 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

const StyledButton = styled.button`
  width: 183px;
  height: 45px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
`;

const KakaoLogin_API = () => {
  const onClick = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
  };

  return (
    <StyledButton
      onClick={onClick}
      style={{
        backgroundImage:
          'url(https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png)'
      }}
    />
  );
};

export default function Template({ header, children }) {
  const theme = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn, userData, setUserData] = useContext(UserContext);
  const loginModalRef = useRef(null);
  const bodyRef = useRef(null);
  const history = useHistory();

  return (
    <>
      <div
        ref={loginModalRef}
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0,
          visibility: 'hidden',
          transition: '0.5s'
        }}
      >
        <StyledCard>
          <RiCloseFill
            onClick={() => {
              loginModalRef.current.style.visibility = 'hidden';
              loginModalRef.current.style.opacity = 0;
              bodyRef.current.style.opacity = 1;
            }}
            size="2rem"
          />
          <div style={{ width: 300, fontWeight: 500, fontSize: 20 }}>
            다양한 플랫폼에 등록된 계정을 사용해 ALOG를 이용할 수 있어요
          </div>
          <KakaoLogin_API />
        </StyledCard>
      </div>
      <div ref={bodyRef}>
        {header && (
          <StickyHeader>
            {!isLoggedIn ? (
              <Button
                label="로그인"
                color={theme.main}
                size="small"
                onClick={() => {
                  loginModalRef.current.style.visibility = 'visible';
                  loginModalRef.current.style.opacity = 1;
                  bodyRef.current.style.opacity = 0.7;
                }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '2rem' }}>
                {userData.userId}님, 안녕하세요!
                <Button
                  label="작성하기"
                  color="transparent"
                  size="small"
                  onClick={() => {
                    history.push('/write');
                  }}
                />
                <Button
                  label="로그아웃"
                  color="transparent"
                  size="small"
                  onClick={() => {
                    try {
                      (async () => {
                        const api_accessToken = await fetchRefreshToken_POST(
                          userData.api_refreshToken
                        );
                        await fetch('/kapi/v1/user/logout', {
                          headers: { authorization: `Bearer ${api_accessToken}` }
                        });

                        setIsLoggedIn(false);
                        setUserData({
                          userId: null,
                          api_accessToken: null,
                          api_refreshToken: null,
                          accessToken: null,
                          refreshToken: null
                        });
                        window.localStorage.removeItem('api_access_token');
                        window.localStorage.removeItem('api_refresh_token');
                        window.localStorage.removeItem('access_token');
                        window.localStorage.removeItem('refresh_token');
                        history.replace('/');
                      })();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                />
              </div>
            )}
          </StickyHeader>
        )}
        <StyledBody>{children}</StyledBody>
      </div>
    </>
  );
}
