import { useLocation } from 'react-router';
import Logo from '../common/Logo';

export default function Error() {
  const location = useLocation();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        gap: 50
      }}
    >
      <div style={{ fontSize: '70px' }}>
        <Logo />
      </div>
      <div>
        <h1>404</h1>
        <h1>{location.pathname}, 알 수 없는 url입니다.</h1>
      </div>
    </div>
  );
}
