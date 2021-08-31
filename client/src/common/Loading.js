import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const loading = keyframes`
  0 {
    transform: translateY(0);
  }
  50% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(0);
  }
`;

const StyledLoading = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: ${(props) => props.color};

  & .load-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
  }

  & .load-wrapper > * {
    width: 20px;
    height: 20px;
    border-radius: 15px;
    background-color: ${(props) => props.color};
    margin: 0.5%;
  }

  & .load-wrapper :nth-last-child(1) {
    animation: 0.6s 0.1s linear infinite ${loading};
  }
  & .load-wrapper :nth-last-child(2) {
    animation: 0.6s 0.2s linear infinite ${loading};
  }
  & .load-wrapper :nth-last-child(3) {
    animation: 0.6s 0.3s linear infinite ${loading};
  }
`;

export default function Loading() {
  const theme = useContext(ThemeContext);

  return (
    <StyledLoading color={theme.main}>
      <div className="load-wrapper">
        <div />
        <div />
        <div />
      </div>
    </StyledLoading>
  );
}
