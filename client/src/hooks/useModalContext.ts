import ModalContext from 'contexts/ModalContext';
import { useContext } from 'react';

export default function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Cannot find ModalContext');
  }
  return context;
}
