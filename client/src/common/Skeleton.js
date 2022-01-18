import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const gradientEffect = keyframes`
  50% {
    opacity: 0.5;
  }
`;

const StyledSkeleton = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height || props.width};
  border-radius: ${(props) => props.borderRadius || '20px'};
  display: absolute;
  transition: 1s;
  background-color: ${(props) => props.backgroundColor};
  animation: 2s ${gradientEffect} infinite;
`;

export default function Skeleton({ width, height, borderRadius }) {
  const theme = useContext(ThemeContext);
  return (
    <StyledSkeleton
      width={width}
      height={height}
      backgroundColor={theme.background}
      borderRadius={borderRadius}
    />
  );
}
