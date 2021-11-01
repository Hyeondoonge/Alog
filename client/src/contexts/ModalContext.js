import { createContext, useState } from 'react';
import Modal from '../common/Modal';

const ModalContext = createContext();

function ModalContextProvider({ children }) {
  const [message, setMessage] = useState('');

  return (
    <ModalContext.Provider value={[setMessage]}>
      {message && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            zIndex: 1000
          }}
        >
          <Modal
            text={message}
            onClickConfirm={() => {
              setMessage('');
            }}
          />
        </div>
      )}
      <div style={{ opacity: message ? 0.5 : 1 }}>{children}</div>
    </ModalContext.Provider>
  );
}

export default ModalContext;

export { ModalContextProvider };
