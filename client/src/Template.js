import { useRef } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import Button from './common/Button';
import StickyHeader from './common/StickyHeader';
import ThemeContext from './contexts/ThemeContext';
import UserContext from './contexts/UserContext';
import { RiCloseFill } from 'react-icons/ri';

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
              <div>
                {userData.userId}
                <Button
                  label="로그아웃"
                  color={theme.main}
                  size="small"
                  onClick={() => {
                    (async () => {
                      await fetch('/kakao/v1/user/logout', {
                        method: 'post',
                        headers: { Authorization: `Bearer ${userData.api_accessToken}` }
                      });
                    })();
                    setIsLoggedIn(false);
                    setUserData({ userId: null, accessToken: null, refreshToke: null });
                    window.localStorage.removeItem('access_token');
                    window.localStorage.removeItem('refresh_token');
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
