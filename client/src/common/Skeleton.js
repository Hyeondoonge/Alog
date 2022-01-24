import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const gradientEffect = keyframes`
  50% {
    opacity: 0.5;
  }
`;

const StyledSkeleton = styled.div`
  & > * {
    transition: 1s;
    background-color: ${(props) => props.backgroundColor};
    animation: 2s ${gradientEffect} infinite;
  }
`;

export default function Skeleton({ Component }) {
  const theme = useContext(ThemeContext);

  return <StyledSkeleton backgroundColor={theme.background}>{Component}</StyledSkeleton>;
}
