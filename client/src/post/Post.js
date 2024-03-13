import { useContext } from 'react';
import styled from 'styled-components';
import Tag from '../common/Tag';
import Card from '../common/Card';
import ThemeContext from '../contexts/ThemeContext';
import { RiThumbUpFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  &:link {
    text-decoration: none;
  }
`;

const StyledPost = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  gap: 10px;
`;

// StyledPost를 젤 바깥으로 빼기
export default function Post({ post }) {
  const { id, title, subtitle, language, writerId, writeDate, likeCount } = post;

  const theme = useContext(ThemeContext);

  return (
    <StyledLink to={`/post?id=${id}`}>
      <Card color="transparent">
        <StyledPost>
          <div style={{ width: '85%' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: '0.5rem',
                alignItems: 'center',
                color: 'white'
              }}
            >
              <div>
                <strong style={{ color: 'white' }}>{title}</strong>
              </div>
              {language && <Tag label={language} size="1.6" />}
            </div>
            <div style={{ color: 'white' }}>
              <span>{subtitle}</span>
            </div>
            <div style={{ color: 'white' }}>
              {writerId} ・ {writeDate}
            </div>
          </div>
          <div
            style={{
              fontSize: '1.8rem',
              wordBreak: 'keep-all',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div>
              <span style={{ color: 'grey' }}>좋은 솔루션이에요</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <RiThumbUpFill color={theme.main} size="2rem" />
              <strong>{likeCount}</strong>
            </div>
          </div>
        </StyledPost>
      </Card>
    </StyledLink>
  );
}
