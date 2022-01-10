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
  height: ${(props) => props.width};
  padding: 1rem 3rem !important;
  border-radius: 20px;
  display: absolute;
  transition: 1s;
  background-color: ${(props) => props.backgroundColor};
  animation: 2s ${gradientEffect} infinite;
`;

export default function Skeleton({ width }) {
  const theme = useContext(ThemeContext);
  return <StyledSkeleton width={width} backgroundColor={theme.background} />;
}
