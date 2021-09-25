import { useContext } from 'react';
import styled from 'styled-components';
import Form from '../common/Form';
import ThemeContext from '../contexts/ThemeContext';

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 1% 2%;
  border-radius: 8px;
  background: ${(props) => props.color || 'default'};
  color: #ffffff;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
`;

export default function WritePost() {
  // 상태관리 (?)
  const theme = useContext(ThemeContext);

  const onClick = (data) => {
    console.log('fetch...');
  };

  const writeButton = () => <StyledButton color={theme.main}>등록</StyledButton>;
  return <Form Button={writeButton} />;
}
