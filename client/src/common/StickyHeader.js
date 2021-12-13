import styled from 'styled-components';
import Logo from './Logo';

const StyledStickyHeader = styled.div`
  /* background-color: #212121; */
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 999;
  backdrop-filter: blur(30px);
  background-color: ${(props) => props.background}00;
`;

export default function StickyHeader({ children }) {
  return (
    <StyledStickyHeader>
      <div
        style={{
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div style={{ fontSize: '3rem', width: '20%' }}>
          <Logo />
        </div>
        <div style={{ width: '80%', height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          {children}
        </div>
      </div>
    </StyledStickyHeader>
  );
}
