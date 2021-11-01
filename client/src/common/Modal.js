import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';
import Button from './Button';

const slideUp = keyframes`
  0% {
    transform: translateY(20px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const StyledModal = styled.div`
  width: 30%;
  background-color: ${(props) => props.color ?? 'white'};
  color: black;
  border-radius: 10px;
  padding: 5rem;
  transition: 0.5s;
  cursor: pointer;
  animation: ${slideUp} 1s;
  box-shadow: 0px 2px 5px 1px #656565;
  text-align: center;
  word-break: keep-all;
`;

export default function Modal({ text, onClickConfirm }) {
  const theme = useContext(ThemeContext);

  return (
    <StyledModal>
      <h1>{text}</h1>
      <Button label="확인" size="small" color={theme.main} onClick={onClickConfirm} />
    </StyledModal>
  );
}
