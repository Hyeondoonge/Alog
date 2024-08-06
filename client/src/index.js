import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from 'ReactQueryDevtools';

if (process.env.REACT_APP_ENV !== 'development') {
  console.log = () => {
    // do nothing
  };
}

// default Option?
const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
