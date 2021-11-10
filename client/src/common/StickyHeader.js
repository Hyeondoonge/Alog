import styled from 'styled-components';
import Logo from './Logo';

const StyledStickyHeader = styled.div`
  background-color: #212121;
  position: sticky;
  top: 0;
  z-index: 999;
  display: flex;
  padding: 1% 2%;
  align-items: center;
`;

export default function StickyHeader({ children }) {
  return (
    <StyledStickyHeader>
      <div style={{ fontSize: '3rem', width: '20%' }}>
        <Logo />
      </div>
      <div style={{ width: '80%', height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        {children}
      </div>
    </StyledStickyHeader>
  );
}
