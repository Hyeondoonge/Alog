import styled, { keyframes } from 'styled-components';
import Button from './Button';

const slideUp = keyframes`
  60% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0px);
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

  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 33%;
`;

export default function Modal({ text, onClickConfirm }) {
  return (
    <StyledModal>
      <h1>{text}</h1>
      <Button label="확인" size="medium" color="#15C4D6" onClick={onClickConfirm} />
    </StyledModal>
  );
}
