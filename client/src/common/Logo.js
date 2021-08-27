import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Logo() {
  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <h1
        style={{
          fontSize: '3.5rem',
          color: '#5F939A',
          textAlign: 'center'
        }}
      >
        ALOG
      </h1>
    </Link>
  );
}
