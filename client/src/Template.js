import { useEffect, useRef } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import Button from './common/Button';
import StickyHeader from './common/StickyHeader';
import ThemeContext from './contexts/ThemeContext';
import UserContext from './contexts/UserContext';
import { useHistory } from 'react-router';
import { RiCloseFill } from 'react-icons/ri';
import { kakao_RefreshAccessToken, kakao_Logout, kakao_GetLoginUrl } from './api/kakaoApi';
import { useMediaQuery } from 'react-responsive';
import { RiPencilFill, RiLoginCircleFill, RiLogoutCircleFill } from 'react-icons/ri';
import Link from './common/Link';
import ProfileImage from './common/ProfileImage';

const StyledBody = styled.div`
  width: 100%;
  font-size: 2rem;

  & > * {
    padding: 3vh 5vw !important;
  }
  @media screen and (min-width: 600px) {
    & > * {
      padding: 10vh 18vw !important;
    }
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

const KakaoLoginAPI = ({ history }) => {
  const onClick = () => {
    (async () => {
      const url = await kakao_GetLoginUrl();
      window.location.href = url;
    })();
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
  const [isLoggedIn, setIsLoggedIn, userData, setUserData] = useContext(UserContext);
  const loginModalRef = useRef(null);
  const bodyRef = useRef(null);
  const history = useHistory();
  const isBigScreen = useMediaQuery({ query: '(min-width: 600px)' });

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
            ????????? ???????????? ????????? ????????? ????????? ALOG??? ????????? ??? ?????????
          </div>
          <KakaoLoginAPI history={history} />
        </StyledCard>
      </div>
      <div ref={bodyRef}>
        {header && (
          <StickyHeader>
            {!isLoggedIn ? (
              <Button
                label={isBigScreen ? '?????????' : <RiLoginCircleFill />}
                color="transparent"
                size="small"
                onClick={() => {
                  loginModalRef.current.style.visibility = 'visible';
                  loginModalRef.current.style.opacity = 1;
                  bodyRef.current.style.opacity = 0.7;
                }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '2rem' }}>
                <Link to={`/home/${userData.userId}`}>
                  <ProfileImage size="2.5rem" filename={userData.profile_fileName} />
                </Link>
                <span style={{ padding: '0.5rem 1rem' }}>{userData.userId}???, ???????????????!</span>
                <Button
                  label={isBigScreen ? '????????????' : <RiPencilFill />}
                  color="transparent"
                  size="small"
                  onClick={() => {
                    history.push('/write');
                  }}
                />
                <Button
                  label={isBigScreen ? '????????????' : <RiLogoutCircleFill />}
                  color="transparent"
                  size="small"
                  onClick={() => {
                    try {
                      (async () => {
                        const api_accessToken = await kakao_RefreshAccessToken(
                          userData.api_refreshToken
                        );

                        const res = await kakao_Logout(api_accessToken);

                        setIsLoggedIn(false);
                        setUserData({
                          userId: null,
                          api_accessToken: null,
                          api_refreshToken: null,
                          accessToken: null,
                          refreshToken: null
                        });
                        window.localStorage.removeItem('api_accessToken');
                        window.localStorage.removeItem('api_refreshToken');
                        window.localStorage.removeItem('accessToken');
                        window.localStorage.removeItem('refreshToken');
                        window.localStorage.removeItem('profile_fileName');
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
