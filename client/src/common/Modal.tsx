import { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

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
  color: black;
  border-radius: 10px;
  padding: 5rem;
  transition: 0.5s;
  cursor: pointer;
  animation: ${slideUp} 1s;
  box-shadow: 0px 2px 5px 1px #656565;
  text-align: center;
  word-break: keep-all;
  font-size: 2.5rem;
  font-weight: 600;
`;

interface ModalProps {
  text: string;
  confirmButton: ReactNode;
}

export default function Modal({ text, confirmButton }: ModalProps) {
  return (
    <StyledModal>
      <div>{text}</div>
      {confirmButton}
    </StyledModal>
  );
}
