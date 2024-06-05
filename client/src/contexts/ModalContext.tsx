import { createContext, useState } from 'react';
import Modal from '../common/Modal';
import Button from 'common/Button';

const ModalContext = createContext<[React.Dispatch<React.SetStateAction<string>>] | null>(null);

function ModalContextProvider({ children }: { children: React.ReactNode }) {
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
            confirmButton={
              <Button
                label="확인"
                size="small"
                onClick={() => {
                  setMessage('');
                }}
              />
            }
          />
        </div>
      )}
      <div style={{ opacity: message ? 0.5 : 1 }}>{children}</div>
    </ModalContext.Provider>
  );
}

export default ModalContext;

export { ModalContextProvider };
