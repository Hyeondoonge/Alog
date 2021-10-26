import { createContext, useState } from 'react';
import Modal from '../common/Modal';

const ModalContext = createContext();

function ModalContextProvider({ children }) {
  const [message, setMessage] = useState('');

  return (
    <ModalContext.Provider value={[setMessage]}>
      <div style={{ opacity: message ? 0.5 : 1 }}>{children}</div>
      {message && (
        <Modal
          text={message + ' ㅠࡇㅠ '}
          onClickConfirm={() => {
            setMessage('');
          }}
        />
      )}
    </ModalContext.Provider>
  );
}

export default ModalContext;

export { ModalContextProvider };
